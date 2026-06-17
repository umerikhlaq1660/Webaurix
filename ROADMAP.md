# ARIA Platform — Implementation Roadmap

## Phase 1 — Foundation (Week 1-2)
**Goal: Backend running locally, ARIA answering questions**

- [ ] Copy `.env.example` → `.env`, fill in `ANTHROPIC_API_KEY`, `SECRET_KEY`, DB passwords
- [ ] `docker-compose up -d db redis` — start PostgreSQL + Redis
- [ ] `psql -U aria_user -d aria_db -f schema.sql` — create tables
- [ ] `cd backend && pip install -r requirements.txt`
- [ ] `uvicorn app.main:app --reload` — start FastAPI
- [ ] `POST /api/v1/auth/register` — create owner account
- [ ] `POST /api/v1/chat` — test ARIA responds as Chief of Staff
- [ ] Verify all 7 agent imports load without errors

**Deliverable:** ARIA answers questions via curl/Postman

---

## Phase 2 — Gmail Integration (Week 2-3)
**Goal: ARIA reads and sends email**

- [ ] Complete Gmail OAuth setup (Google Cloud Console → OAuth Playground)
- [ ] Add 4 Gmail secrets to `.env`
- [ ] Test `GmailService.send()` with a real email
- [ ] Test `GmailService.list_unread()` returns emails
- [ ] Set up Gmail Pub/Sub push notifications to `/api/v1/webhooks/gmail`
- [ ] Verify inbound email triggers ARIA processing via Celery

**Deliverable:** ARIA sends and reads email autonomously

---

## Phase 3 — Dashboard (Week 3-4)
**Goal: Next.js frontend connected to API**

- [ ] `cd frontend-dashboard && npm install`
- [ ] Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_ARIA_SECRET`
- [ ] `npm run dev` — dashboard runs on localhost:3000
- [ ] Login page works with JWT
- [ ] ARIA chat with voice input/output works in browser
- [ ] Verify lock screen → code → full access flow

**Deliverable:** Founder can chat with ARIA via web UI with voice

---

## Phase 4 — WhatsApp (Week 4-5)
**Goal: ARIA receives and replies on WhatsApp**

- [ ] Apply for WhatsApp Business API (Meta Business Manager)
- [ ] Get `WHATSAPP_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`
- [ ] Set up webhook: `https://your-domain.com/api/v1/webhooks/whatsapp`
- [ ] Verify token handshake succeeds
- [ ] Test: send WhatsApp message → ARIA replies in seconds

**Deliverable:** WhatsApp channel fully operational

---

## Phase 5 — Google Calendar + Meetings (Week 5-6)
**Goal: ARIA schedules and manages meetings**

- [ ] Create Google service account, enable Calendar API
- [ ] Add service account JSON to `.env`
- [ ] Test `CalendarService.create_event()` creates calendar entry
- [ ] Test ARIA "schedule meeting" tool call triggers email + calendar invite
- [ ] Test `list_upcoming()` returns this week's meetings

**Deliverable:** "Schedule a meeting with Ahmed for Thursday" → calendar + email done

---

## Phase 6 — Automated Reports (Week 6)
**Goal: Daily and weekly reports emailed automatically**

- [ ] Start Celery worker: `celery -A app.workers.celery_app worker`
- [ ] Start Celery beat: `celery -A app.workers.celery_app beat`
- [ ] Verify daily report task runs at 8 AM PKT
- [ ] Verify weekly report runs Monday morning
- [ ] Verify overdue task alerts email fires every 2 hours

**Deliverable:** Founder receives automated reports every morning

---

## Phase 7 — Vector Memory (Week 7)
**Goal: ARIA remembers everything across sessions**

- [ ] Add `OPENAI_API_KEY` for embeddings (or swap to a local model)
- [ ] Run a few conversations — verify memories are stored in `memories` table
- [ ] Ask ARIA about a past client from 3 days ago — verify it recalls correctly
- [ ] Tune `memory_top_k` based on response quality vs token cost

**Deliverable:** ARIA has persistent cross-session memory

---

## Phase 8 — Production Deployment (Week 8)
**Goal: System running 24/7 in production**

- [ ] Provision VPS (DigitalOcean $24/mo or Railway)
- [ ] Point `aria.webaurix.com` to server
- [ ] Configure Nginx reverse proxy + SSL (Let's Encrypt)
- [ ] Switch all `.env` values to production credentials
- [ ] `docker-compose -f docker-compose.yml up -d` — all services running
- [ ] Set up GitHub Actions CI/CD for auto-deploy on push to main
- [ ] Smoke test all channels: web, email, WhatsApp, voice
- [ ] Set up uptime monitoring (UptimeRobot — free)

**Deliverable:** ARIA running 24/7, reachable at aria.webaurix.com

---

## Tech Costs (Monthly, Production)

| Service | Cost |
|---------|------|
| VPS (4GB RAM) | ~$24/mo |
| PostgreSQL (managed, optional) | ~$7/mo |
| Claude API (claude-sonnet-4-6) | ~$15-40/mo (usage-based) |
| OpenAI embeddings | ~$1-3/mo |
| WhatsApp Business API | Free for 1,000 conversations/mo |
| Gmail API | Free |
| Google Calendar API | Free |
| **Total** | **~$50-75/mo** |

---

## Security Checklist

- [x] JWT auth on all protected endpoints
- [x] Owner approval gate for critical actions (payments, contracts, hiring)
- [x] No secrets in code — all via `.env`
- [x] SQL injection prevention via parameterized queries
- [x] CORS restricted to frontend URL only
- [x] Webhook verify tokens for WhatsApp
- [x] Rate limiting (add `slowapi` middleware in production)
- [x] Audit log table for all ARIA actions
- [ ] Add IP allowlist for webhook endpoints in production
- [ ] Enable PostgreSQL SSL in production connection string
