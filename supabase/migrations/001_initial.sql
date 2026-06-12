-- ============================================================
-- JanFlims — Supabase / PostgreSQL initial schema
-- Run in the Supabase SQL Editor or via: supabase db push
-- ============================================================

-- Enums
CREATE TYPE role       AS ENUM ('user', 'admin');
CREATE TYPE video_type AS ENUM ('movie', 'series');

-- Users
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL UNIQUE,
  password    VARCHAR(255)  NOT NULL,
  role        role          NOT NULL DEFAULT 'user',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Videos
CREATE TABLE videos (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  slug          VARCHAR(255) NOT NULL UNIQUE,
  description   TEXT         NOT NULL,
  stream_url    TEXT         NOT NULL,
  trailer_url   TEXT,
  thumbnail_url TEXT         NOT NULL,
  backdrop_url  TEXT,
  type          video_type   NOT NULL,
  genre         VARCHAR(255) NOT NULL,
  release_year  INT          NOT NULL,
  rating        VARCHAR(10)  NOT NULL,
  duration      INT,
  imdb_score    NUMERIC(3,1),
  language      VARCHAR(50)  NOT NULL,
  is_featured   BOOLEAN      NOT NULL DEFAULT FALSE,
  views         INT          NOT NULL DEFAULT 0,
  cast          TEXT,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  slug  VARCHAR(100) NOT NULL UNIQUE
);

-- Video ↔ Category join
CREATE TABLE video_categories (
  video_id    INT NOT NULL REFERENCES videos(id)     ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (video_id, category_id)
);

-- Watch history
CREATE TABLE watch_history (
  id               SERIAL PRIMARY KEY,
  user_id          INT         NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  video_id         INT         NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  watched_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  progress_seconds INT         NOT NULL DEFAULT 0,
  UNIQUE (user_id, video_id)
);

-- Ratings
CREATE TABLE ratings (
  id       SERIAL PRIMARY KEY,
  user_id  INT     NOT NULL REFERENCES users(id)  ON DELETE CASCADE,
  video_id INT     NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  score    INT     NOT NULL,
  liked    BOOLEAN NOT NULL DEFAULT FALSE,
  UNIQUE (user_id, video_id)
);

-- Helper RPC used by /api/watch to atomically increment view count
CREATE OR REPLACE FUNCTION increment_views(video_id INT)
RETURNS VOID
LANGUAGE SQL
AS $$
  UPDATE videos SET views = views + 1 WHERE id = video_id;
$$;

-- Optional: enable Row Level Security (recommended for production)
-- ALTER TABLE users         ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE videos        ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ratings       ENABLE ROW LEVEL SECURITY;
-- (add your policies here)
