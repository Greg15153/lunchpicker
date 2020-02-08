CREATE DATABASE lunchpicker;

CREATE TABLE user_base (
    db_id         SERIAL      PRIMARY KEY
  , id            UUID        NOT NULL
  , first_name    VARCHAR     NULL
  , last_name     VARCHAR     NULL
  , created_by    UUID        NOT NULL
  , created_date  TIMESTAMPTZ NOT NULL
  , modified_by   UUID        NOT NULL
  , modified_date TIMESTAMPTZ NOT NULL
  , deleted       BOOL        NOT NULL DEFAULT FALSE
  , UNIQUE(id)
);

CREATE TABLE user_history (
    db_id         BIGINT      NOT NULL
  , id            UUID        NOT NULL
  , first_name    VARCHAR     NULL
  , last_name     VARCHAR     NULL
  , created_by    UUID        NOT NULL
  , created_date  TIMESTAMPTZ NOT NULL
  , modified_by   UUID        NOT NULL
  , modified_date TIMESTAMPTZ NOT NULL
  , deleted       BOOL        NOT NULL
);

CREATE OR REPLACE FUNCTION user_update_tr()
    RETURNS trigger AS
$BODY$
BEGIN
    INSERT INTO user_history (db_id, id, first_name, last_name, created_by, created_date, modified_by, modified_date, deleted )
         VALUES (OLD.db_id, OLD.id, OLD.first_name, OLD.last_name, OLD.created_by, OLD.created_date, OLD.modified_by, OLD.modified_date, OLD.deleted);
    
    return NEW;
END;
$BODY$ LANGUAGE plpgsql
       SECURITY DEFINER;

CREATE TRIGGER user_update_trigger
    BEFORE UPDATE 
    ON user_base
    FOR EACH ROW
    EXECUTE PROCEDURE user_update_tr();

CREATE OR REPLACE VIEW user_v1 AS
    SELECT id
         , first_name
         , last_name
         , created_by
         , created_date
         , modified_by
         , modified_date
      FROM user_base
     WHERE NOT deleted;


INSERT INTO user_base (id, first_name, last_name, created_by, created_date, modified_by, modified_date)
    VALUES ('090b3e9a-7a7f-4da0-b0b5-6d4707178791', 'admin', 'lunchpicker', '090b3e9a-7a7f-4da0-b0b5-6d4707178791',  CURRENT_TIMESTAMP, '090b3e9a-7a7f-4da0-b0b5-6d4707178791', CURRENT_TIMESTAMP);