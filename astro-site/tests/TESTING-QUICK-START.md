# Testing Quick Start Guide
**HUSTLE Survey - Automated Testing Suite**

---

## 🚀 First Time Setup (One Time Only)

### Step 1: Install Dependencies

```bash
cd /home/jeremy/projects/intent-solutions-landing/astro-site

# Install test dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.test.example .env.test

# Edit .env.test with your values
nano .env.test
```

**Required values in `.env.test`:**
```bash
SURVEY_URL=https://intentsolutions.io
NETLIFY_SITE_ID=your-site-id  # Optional for API tests
NETLIFY_AUTH_TOKEN=your-token # Optional for API tests
```

**To get Netlify credentials (optional):**
1. Go to https://app.netlify.com/user/applications
2. Create new personal access token
3. Go to your site > Site settings > General
4. Copy Site ID

---

## ▶️ Running Tests

### Basic Test Run

```bash
# Run all tests (headless)
npm test
```

### Visual Mode (See Browser)

```bash
# Run with visible browser
npm run test:headed

# Run with Playwright UI (best for debugging)
npm run test:ui
```

### Run Specific Tests

```bash
# Run only form submission tests
npm test tests/form-submission.spec.js
```

### Run on Specific Browsers

```bash
# Chrome only
npm run test:chromium

# Firefox only
npm run test:firefox

# Safari only
npm run test:webkit

# Mobile devices only
npm run test:mobile

# All browsers + mobile
npm run test:all
```

---

## 📊 Understanding Test Results

### Success Output

```
✓ TEST 001: Form loads with correct Netlify attributes (2.5s)
✓ TEST 002: Submit valid form and verify submission (5.2s)
✓ TEST 003: Network monitoring and error logging (3.8s)

  8 passed (24.3s)
```

### Where to Find Evidence

```
tests/
├── screenshots/          # Screenshots of each test
├── reports/             # Test reports and CSV exports
│   ├── playwright-html/ # HTML test report
│   ├── test-results.json
│   └── submissions-export.csv
└── videos/              # Videos of failed tests
```

### View HTML Report

```bash
npm run test:report
```

This opens a browser with:
- Test pass/fail status
- Screenshots
- Error details
- Timing information

---

## 🔍 Debugging Failed Tests

### Step 1: Run in Debug Mode

```bash
npm run test:debug
```

This opens Playwright Inspector where you can:
- Step through each action
- See the page state
- Inspect elements
- View console logs

### Step 2: Check Screenshots

```bash
# View screenshot folder
ls -la tests/screenshots/

# Failed tests automatically save screenshots
```

### Step 3: Check Console Output

Test logs show detailed information:
```
========== Form Submission Test ==========
✓ Response Status: 200
✓ Response URL: https://...
✓ Redirect URL: https://.../thank-you
✓ Test Email: test-1234567890@example.com
==========================================
```

### Step 4: Check Netlify Dashboard

If tests show submissions but you don't see them:
1. Log into https://app.netlify.com
2. Go to your site > Forms
3. Check if submissions appear there

---

## ✅ Pre-Launch Testing Workflow

### Step 1: Run Automated Tests

```bash
npm test
```

**Expected: All tests PASS**

### Step 2: Manual Checks

Open `tests/PRE-LAUNCH-CHECKLIST.md` and complete:
- [ ] Netlify dashboard verification
- [ ] Email notification test
- [ ] Real device testing
- [ ] Personal email test

### Step 3: Record Evidence

**Save these for documentation:**
```
tests/screenshots/
├── form-loaded.png        # Form with correct attributes
├── form-filled.png        # Completed form
├── form-success.png       # Success page
├── validation-error.png   # Validation working
├── mobile-viewport.png    # Mobile responsive
└── clean-console.png      # No errors
```

### Step 4: Export Submission IDs

Tests automatically create:
```
tests/reports/
├── submission-XXXXXX.json     # Individual submissions
├── network-activity.json      # Network monitoring
├── rapid-submissions.json     # Multiple submission IDs
└── all-submissions.json       # Full export (if API configured)
```

---

## 📝 Common Issues & Solutions

### Issue: "Cannot find module 'axios'"

**Solution:**
```bash
npm install
```

### Issue: "Browser not found"

**Solution:**
```bash
npx playwright install
```

### Issue: "NETLIFY_SITE_ID is required"

**Solution:** These tests are optional. Either:
1. Configure `.env.test` with credentials, OR
2. Skip API tests (they use `test.skip()`)

### Issue: Tests timeout

**Solution:**
```bash
# Increase timeout
npm test -- --timeout=60000
```

### Issue: "Form not found"

**Solution:** Verify survey is deployed:
```bash
curl -I https://intentsolutions.io/survey/15
```

### Issue: Tests pass but no emails

**Solution:**
1. Check Netlify dashboard > Forms > Settings > Notifications
2. Verify email notification is configured
3. Submit manual test form
4. Check spam folder

---

## 🎯 Quick Reference

### Most Useful Commands

```bash
# Run tests with visible browser
npm run test:headed

# Run with interactive UI
npm run test:ui

# View test report
npm run test:report

# Debug specific test
npm run test:debug tests/form-submission.spec.js

# Run on mobile devices only
npm run test:mobile
```

### Test File Locations

```
tests/
├── form-submission.spec.js    # Main E2E tests
├── netlify-api.spec.js        # API integration tests
├── helpers.js                 # Utility functions
├── PRE-LAUNCH-CHECKLIST.md    # Manual checklist
└── TESTING-QUICK-START.md     # This file
```

---

## 🚀 Launch Day Checklist

**30 Minutes Before Send:**

```bash
# 1. Run full test suite
npm run test:all

# 2. Generate test report
npm run test:report

# 3. Verify all tests PASS

# 4. Complete manual checklist
cat tests/PRE-LAUNCH-CHECKLIST.md

# 5. Record confirmation number

# 6. LAUNCH! 🎉
```

---

## 📞 Support

**If tests fail:**
1. Check screenshots in `tests/screenshots/`
2. Review HTML report: `npm run test:report`
3. Run in debug mode: `npm run test:debug`
4. Check Netlify dashboard manually
5. Review function logs in Netlify

**Emergency Rollback:**
```bash
netlify rollback
```

---

**Last Updated:** 2025-10-08
**Version:** 1.0.0
**Status:** Ready for Use ✅
