-- Insert sample users
INSERT INTO users (username, password) VALUES
('user1', 'password1'),
('user2', 'password2');

-- Insert sample posts
INSERT INTO posts (title, content, author_id) VALUES
('First Post', 'This is the first post', 1),
('Second Post', 'This is the second post', 2);

-- Insert sample messages
INSERT INTO messages (content, sender_id, post_id) VALUES
('Hello, how are you?', 1, 1),
('I am fine, thank you!', 2, 1);
