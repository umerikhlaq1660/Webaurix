-- ============================================================
--  ARIA PLATFORM — DATABASE SCHEMA
--  Webaurix Autonomous AI Manager
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- ── Users (team + owner) ─────────────────────────────────────
CREATE TABLE users (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email         VARCHAR(255) UNIQUE NOT NULL,
    name          VARCHAR(255) NOT NULL,
    role          VARCHAR(50)  NOT NULL DEFAULT 'member',  -- 'owner','manager','member'
    hashed_password TEXT NOT NULL,
    is_active     BOOLEAN DEFAULT true,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Clients ──────────────────────────────────────────────────
CREATE TABLE clients (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name          VARCHAR(255) NOT NULL,
    email         VARCHAR(255),
    phone         VARCHAR(50),
    company       VARCHAR(255),
    country       VARCHAR(100),
    timezone      VARCHAR(100) DEFAULT 'Asia/Karachi',
    status        VARCHAR(50)  DEFAULT 'lead',   -- 'lead','active','paused','churned'
    source        VARCHAR(100),                  -- 'website','referral','whatsapp'
    budget_range  VARCHAR(100),
    services      TEXT[],
    notes         TEXT,
    whatsapp_id   VARCHAR(100),
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Projects ─────────────────────────────────────────────────
CREATE TABLE projects (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id     UUID REFERENCES clients(id) ON DELETE SET NULL,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    status        VARCHAR(50)  DEFAULT 'planning',  -- 'planning','active','review','done','paused'
    priority      VARCHAR(20)  DEFAULT 'medium',
    budget        DECIMAL(14,2),
    currency      VARCHAR(10)  DEFAULT 'USD',
    deadline      TIMESTAMPTZ,
    started_at    TIMESTAMPTZ,
    completed_at  TIMESTAMPTZ,
    tech_stack    TEXT[],
    metadata      JSONB DEFAULT '{}',
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Tasks ────────────────────────────────────────────────────
CREATE TABLE tasks (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id      UUID REFERENCES projects(id) ON DELETE CASCADE,
    parent_task_id  UUID REFERENCES tasks(id) ON DELETE SET NULL,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    assigned_agent  VARCHAR(100),  -- 'sales','developer','marketing','finance', etc.
    assigned_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status          VARCHAR(50)  DEFAULT 'pending',  -- 'pending','in_progress','review','done','blocked'
    priority        VARCHAR(20)  DEFAULT 'medium',   -- 'low','medium','high','critical'
    due_date        TIMESTAMPTZ,
    completed_at    TIMESTAMPTZ,
    estimated_hours DECIMAL(6,2),
    actual_hours    DECIMAL(6,2),
    result          TEXT,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Conversations ────────────────────────────────────────────
CREATE TABLE conversations (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id   VARCHAR(255) NOT NULL UNIQUE,
    user_id      UUID REFERENCES users(id) ON DELETE SET NULL,
    client_id    UUID REFERENCES clients(id) ON DELETE SET NULL,
    channel      VARCHAR(50)  DEFAULT 'web',   -- 'web','email','whatsapp','voice'
    title        VARCHAR(255),
    is_archived  BOOLEAN DEFAULT false,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id  UUID REFERENCES conversations(id) ON DELETE CASCADE,
    role             VARCHAR(20) NOT NULL,  -- 'user','assistant','agent','system'
    content          TEXT NOT NULL,
    agent_name       VARCHAR(100),          -- which agent replied
    tool_calls       JSONB,                 -- tool calls made during this turn
    tokens_used      INTEGER,
    metadata         JSONB DEFAULT '{}',
    created_at       TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);

-- ── Semantic Memory (pgvector) ───────────────────────────────
CREATE TABLE memories (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content      TEXT NOT NULL,
    embedding    vector(1536),             -- text-embedding-3-small dimensions
    memory_type  VARCHAR(50),             -- 'client','project','decision','meeting','process','kpi'
    entity_type  VARCHAR(50),             -- 'client','project','task','meeting'
    entity_id    UUID,
    importance   SMALLINT DEFAULT 3,      -- 1-5 scale
    metadata     JSONB DEFAULT '{}',
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    expires_at   TIMESTAMPTZ              -- NULL = permanent
);
CREATE INDEX idx_memories_embedding ON memories USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_memories_type ON memories(memory_type, entity_type);

-- ── Meetings ─────────────────────────────────────────────────
CREATE TABLE meetings (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id        UUID REFERENCES clients(id) ON DELETE SET NULL,
    project_id       UUID REFERENCES projects(id) ON DELETE SET NULL,
    title            VARCHAR(255) NOT NULL,
    description      TEXT,
    scheduled_at     TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    status           VARCHAR(50) DEFAULT 'scheduled',  -- 'scheduled','completed','cancelled','rescheduled'
    meeting_link     TEXT,
    google_event_id  TEXT,
    attendees        JSONB DEFAULT '[]',
    notes            TEXT,
    summary          TEXT,                -- AI-generated summary after meeting
    action_items     JSONB DEFAULT '[]',
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── Reports ──────────────────────────────────────────────────
CREATE TABLE reports (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type   VARCHAR(50) NOT NULL,  -- 'daily','weekly','monthly','kpi'
    period_start  TIMESTAMPTZ NOT NULL,
    period_end    TIMESTAMPTZ NOT NULL,
    content       JSONB NOT NULL,
    summary       TEXT,
    generated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── KPIs ─────────────────────────────────────────────────────
CREATE TABLE kpis (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name  VARCHAR(100) NOT NULL,  -- 'new_leads','revenue','tasks_completed'
    value        DECIMAL(14,2) NOT NULL,
    unit         VARCHAR(50),
    period       VARCHAR(20),            -- 'daily','weekly','monthly'
    metadata     JSONB DEFAULT '{}',
    recorded_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_kpis_metric ON kpis(metric_name, recorded_at DESC);

-- ── Email Log ────────────────────────────────────────────────
CREATE TABLE email_log (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    direction    VARCHAR(10) NOT NULL,  -- 'inbound','outbound'
    from_addr    TEXT NOT NULL,
    to_addr      TEXT NOT NULL,
    subject      TEXT,
    body_preview TEXT,
    gmail_id     TEXT,
    client_id    UUID REFERENCES clients(id) ON DELETE SET NULL,
    status       VARCHAR(50) DEFAULT 'received',  -- 'received','processed','replied','failed'
    ai_summary   TEXT,
    ai_reply     TEXT,
    sent_at      TIMESTAMPTZ,
    received_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Approvals (owner gate) ───────────────────────────────────
CREATE TABLE approvals (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action_type   VARCHAR(100) NOT NULL,  -- 'payment','contract','hire','delete_account'
    description   TEXT NOT NULL,
    requested_by  VARCHAR(100) NOT NULL,  -- 'ARIA' or agent name
    payload       JSONB NOT NULL,
    status        VARCHAR(50) DEFAULT 'pending',  -- 'pending','approved','rejected'
    owner_note    TEXT,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    decided_at    TIMESTAMPTZ
);

-- ── Audit Log ────────────────────────────────────────────────
CREATE TABLE audit_log (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor        VARCHAR(255) NOT NULL,  -- user email or 'ARIA' or agent name
    action       VARCHAR(255) NOT NULL,
    entity_type  VARCHAR(100),
    entity_id    UUID,
    changes      JSONB,
    ip_address   INET,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);
