INSERT INTO LANGUAGES (language_name) VALUES ('English');
INSERT INTO LANGUAGES (language_name) VALUES ('Chinese (Simplified)');
INSERT INTO LANGUAGES (language_name) VALUES ('Chinese (Traditional)');
INSERT INTO LANGUAGES (language_name) VALUES ('Japanese');

INSERT INTO PROF_LEVELS (prof_label) VALUES ('Beginner');
INSERT INTO PROF_LEVELS (prof_label) VALUES ('Intermediate');
INSERT INTO PROF_LEVELS (prof_label) VALUES ('Advanced');
INSERT INTO PROF_LEVELS (prof_label) VALUES ('Native');

INSERT INTO USER_LIST (username, email) VALUES ('EpicPhilure','pcchen@stanford.edu');
INSERT INTO USER_LIST (username, email) VALUES ('Graziosa', 'gckwan@stanford.edu');
INSERT INTO USER_LANGUAGES VALUES(1,1,4);
INSERT INTO USER_LANGUAGES VALUES(1,2,2);
INSERT INTO USER_LANGUAGES VALUES(1,3,2);
INSERT INTO USER_LANGUAGES VALUES(2,1,4);
INSERT INTO USER_LANGUAGES VALUES(2,2,3);
INSERT INTO USER_LANGUAGES VALUES(2,3,3);
INSERT INTO USER_CREDITS (user_id) VALUES (1); 
INSERT INTO USER_CREDITS (user_id) VALUES (2); 
INSERT INTO REQ_STATUSES (status_message) VALUES ('Ongoing');
INSERT INTO REQ_STATUSES (status_message) VALUES ('Completed');
INSERT INTO REQUESTS (requester, from_language, from_text, to_language, status_id) VALUES (1, 1, 'I Love You', 2, 1);
INSERT INTO REQUESTS (requester, from_language, from_text, to_language, status_id) VALUES (1, 1, 'RAWR', 2, 2);
INSERT INTO REQ_RESPONSES (request_id, responder, response) VALUES (1, 2, 'Wo Ai Ni'); 
