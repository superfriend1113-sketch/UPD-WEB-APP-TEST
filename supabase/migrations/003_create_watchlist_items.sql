-- Migration: Create watchlist_items table
-- Description: Stores user watchlist/favorites for deals
-- Created: 2024

-- Create watchlist_items table
CREATE TABLE IF NOT EXISTS watchlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Ensure user can't add same deal twice
  UNIQUE(user_id, deal_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_watchlist_user_id ON watchlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_deal_id ON watchlist_items(deal_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_created_at ON watchlist_items(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE watchlist_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own watchlist items
CREATE POLICY "Users can view their own watchlist items" 
  ON watchlist_items FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own watchlist items" 
  ON watchlist_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own watchlist items" 
  ON watchlist_items FOR DELETE 
  USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE watchlist_items IS 'Stores user watchlist/favorites for tracking deals';
COMMENT ON COLUMN watchlist_items.user_id IS 'Reference to the user who added the deal to watchlist';
COMMENT ON COLUMN watchlist_items.deal_id IS 'Reference to the deal being watched';
COMMENT ON COLUMN watchlist_items.created_at IS 'Timestamp when deal was added to watchlist';
