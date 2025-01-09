/*
  # Add manufacturer management, notifications and chat features

  1. New Tables
    - `manufacturers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `tier` (int)
      - `logo_url` (text)
      - `website` (text)
      - `address` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `content` (text)
      - `type` (text)
      - `read` (boolean)
      - `created_at` (timestamp)

    - `chat_rooms`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `buyer_id` (uuid, foreign key)
      - `seller_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `chat_messages`
      - `id` (uuid, primary key)
      - `room_id` (uuid, foreign key)
      - `sender_id` (uuid, foreign key)
      - `content` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Manufacturers table
CREATE TABLE manufacturers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  tier int NOT NULL CHECK (tier BETWEEN 1 AND 3),
  logo_url text,
  website text,
  address text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Manufacturers are viewable by everyone"
  ON manufacturers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Manufacturers can be updated by owners"
  ON manufacturers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT user_id FROM manufacturer_users WHERE manufacturer_id = id
  ));

-- Notifications table
CREATE TABLE notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Chat rooms table
CREATE TABLE chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products NOT NULL,
  buyer_id uuid REFERENCES auth.users NOT NULL,
  seller_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat rooms"
  ON chat_rooms
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = buyer_id OR
    auth.uid() = seller_id
  );

-- Chat messages table
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms NOT NULL,
  sender_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their chat rooms"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE id = room_id
      AND (buyer_id = auth.uid() OR seller_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their chat rooms"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE id = room_id
      AND (buyer_id = auth.uid() OR seller_id = auth.uid())
    )
  );