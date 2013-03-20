CREATE SEQUENCE uid_seq START 1;
CREATE SEQUENCE lang_seq START 1;
CREATE SEQUENCE prof_seq START 1;
CREATE SEQUENCE req_stat_seq START 1;
CREATE SEQUENCE resp_seq START 1;
CREATE SEQUENCE req_seq START 1;
CREATE TABLE user_list (
  user_id integer PRIMARY KEY DEFAULT nextval('uid_seq'),
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE
);

CREATE TABLE languages(
  language_id integer PRIMARY KEY DEFAULT nextval('lang_seq'),
  language_name text NOT NULL
);

CREATE TABLE prof_levels(
  prof_level integer PRIMARY KEY DEFAULT nextval('prof_seq'),
  prof_label text NOT NULL
);

CREATE TABLE user_languages (
  user_id integer NOT NULL REFERENCES user_list(user_id) ON DELETE CASCADE,
  language_id integer NOT NULL REFERENCES languages(language_id) ON DELETE CASCADE,
  prof_level integer NOT NULL REFERENCES prof_levels(prof_level) ON DELETE CASCADE
);

CREATE TABLE user_credits(
  user_id integer PRIMARY KEY NOT NULL REFERENCES user_list(user_id) ON DELETE CASCADE,
  gold_credits integer DEFAULT 10,
  silver_credits integer DEFAULT 0
);

CREATE TABLE req_statuses(
  status_id integer PRIMARY KEY DEfAULT nextval('req_stat_seq'),
  status_message text NOT NULL
);

CREATE TABLE requests(
  request_id integer PRIMARY KEY DEFAULT nextval('req_seq'),
  requester integer NOT NULL REFERENCES user_list(user_id) ON DELETE CASCADE,
  from_language integer NOT NULL REFERENCES languages(language_id) ON DELETE CASCADE,
  from_text text NOT NULL,
  to_language integer NOT NULL REFERENCES languages(language_id) ON DELETE CASCADE,
  status_id integer NOT NULL REFERENCES req_statuses(status_id)
);

CREATE TABLE req_responses(
  response_id integer PRIMARY KEY DEFAULT nextval('resp_seq'),
  request_id integer NOT NULL REFERENCES requests(request_id) ON DELETE CASCADE,
  responder integer NOT NULL REFERENCES user_list(user_id) ON DELETE CASCADE,
  response text NOT NULL
)
