/**
 * ═══════════════════════════════════════════════════════
 * TEAM VAYU — NODE.JS / EXPRESS WEB APPLICATION SERVER
 * ═══════════════════════════════════════════════════════
 * High-performance backend providing:
 * - Multi-page clean URL routing:
 *   - /       -> Home Page (Hero, About Us, Latest Dev, Footer)
 *   - /fleet  -> Fleet Page (Drishti, Rakshak, Sagar, Capabilities, Components, Gallery)
 *   - /team   -> Team Page (Domains, Leads, Members, Areas of Expertise, Contributions, Competitions, Sponsors)
 * - RESTful API routes (/api/team, /api/fleet, /api/brand, /api/contact)
 * - Transmission message storage for contact and sponsorship inquiries
 * ═══════════════════════════════════════════════════════
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data Directory for contact & sponsorship messages
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const messagesFile = path.join(dataDir, 'messages.json');
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([], null, 2), 'utf8');
}

// ── REST API ROUTES ───────────────────────────────────

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'TEAM VAYU FLIGHT SERVER',
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

// Brand Metadata
app.get('/api/brand', (req, res) => {
  res.json({
    name: 'TEAM VAYU',
    tagline: 'ENGINEERING THE FUTURE OF FLIGHT',
    institute: 'IEM — Institute of Engineering & Management, Kolkata',
    instagram: '@teamvayu.iemk',
    instagramUrl: 'https://www.instagram.com/teamvayu.iemk/'
  });
});

// Fleet API
app.get('/api/fleet', (req, res) => {
  try {
    const VAYU_DATA = require('./js/data.js');
    res.json(VAYU_DATA.fleet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load fleet data', details: err.message });
  }
});

// Team Roster API (Supports ?year=2026 or ?year=2025)
app.get('/api/team', (req, res) => {
  try {
    const VAYU_DATA = require('./js/data.js');
    const year = req.query.year || '2026';
    if (VAYU_DATA.teamByYear && VAYU_DATA.teamByYear[year]) {
      return res.json({ year, ...VAYU_DATA.teamByYear[year] });
    }
    res.json({ year: 'all', data: VAYU_DATA.teamByYear });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve team roster', details: err.message });
  }
});

// Sponsors API
app.get('/api/sponsors', (req, res) => {
  try {
    const VAYU_DATA = require('./js/data.js');
    res.json({ sponsors: VAYU_DATA.sponsors, tiers: VAYU_DATA.sponsorTiers });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve sponsors', details: err.message });
  }
});

// Contact & Sponsorship Form Submission API
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message, organization, tier } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, and message are required.'
    });
  }

  const newTransmission = {
    id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    name: name.trim(),
    email: email.trim(),
    organization: organization ? organization.trim() : null,
    tier: tier ? tier.trim() : null,
    subject: subject ? subject.trim() : 'General Transmission',
    message: message.trim()
  };

  try {
    const existingRaw = fs.readFileSync(messagesFile, 'utf8');
    const messages = JSON.parse(existingRaw || '[]');
    messages.push(newTransmission);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf8');

    console.log(`[TRANSMISSION RECEIVED] From: ${newTransmission.name} <${newTransmission.email}> | Subject: ${newTransmission.subject}`);

    res.status(201).json({
      success: true,
      transmissionId: newTransmission.id,
      message: 'Transmission received. Team VAYU flight ops will respond promptly.'
    });
  } catch (err) {
    console.error('Failed to save message:', err);
    res.status(500).json({
      success: false,
      error: 'Server error processing transmission.'
    });
  }
});

// ── STATIC FILE SERVING ───────────────────────────────
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// ── PAGE ROUTING ──────────────────────────────────────
// 1. Home Page: Hero, About Us, Latest Dev, Footer (Sponsors + Socials)
app.get(['/', '/home', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 2. Fleet Anchor Redirect -> Section 02 on unified page
app.get(['/fleet', '/fleet.html'], (req, res) => {
  res.redirect('/#fleet');
});

// 3. Team Anchor Redirect -> Section 03 on unified page
app.get(['/team', '/team.html'], (req, res) => {
  res.redirect('/#team');
});

// Fallback for static assets in root
app.use(express.static(__dirname));

// Start Server
app.listen(PORT, () => {
  console.log(`
  ═══════════════════════════════════════════════════════
  ✈  TEAM VAYU — FLIGHT OPS SERVER RUNNING
  ═══════════════════════════════════════════════════════
  ▸ Home Page:          http://localhost:${PORT}/
  ▸ Fleet Page:         http://localhost:${PORT}/fleet
  ▸ Team Page:          http://localhost:${PORT}/team
  ▸ Health API:         http://localhost:${PORT}/api/health
  ▸ Fleet API:          http://localhost:${PORT}/api/fleet
  ▸ Team API:           http://localhost:${PORT}/api/team?year=2026
  ▸ Contact API:        POST http://localhost:${PORT}/api/contact
  ═══════════════════════════════════════════════════════
  `);
});
