-- Migration: Create price_alerts table
-- Description: Stores user price drop alerts for deals
-- Created: 2024

-- Create price_alerts table
CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  target_price DECIMAL(10, 2) NOT NULL CHECK (target_price >= 0),
  notified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  
  -- Ensure user can't create multiple alerts for same deal
  UNIQUE(user_id, deal_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_price_alerts_user_id ON price_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_deal_id ON price_alerts(deal_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_notified ON price_alerts(notified) WHERE notified = false;
CREATE INDEX IF NOT EXISTS idx_price_alerts_created_at ON price_alerts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own price alerts
CREATE POLICY "Users can view their own price alerts" 
  ON price_alerts FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own price alerts" 
  ON price_alerts FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own price alerts" 
  ON price_alerts FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own price alerts" 
  ON price_alerts FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_price_alerts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER price_alerts_updated_at
  BEFORE UPDATE ON price_alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_price_alerts_updated_at();

-- Add comments for documentation
COMMENT ON TABLE price_alerts IS 'Stores user price drop alerts for deals';
COMMENT ON COLUMN price_alerts.user_id IS 'Reference to the user who created the alert';
COMMENT ON COLUMN price_alerts.deal_id IS 'Reference to the deal being monitored';
COMMENT ON COLUMN price_alerts.target_price IS 'The price threshold that triggers the alert';
COMMENT ON COLUMN price_alerts.notified IS 'Whether the user has been notified about price drop';
COMMENT ON COLUMN price_alerts.created_at IS 'Timestamp when alert was created';
COMMENT ON COLUMN price_alerts.updated_at IS 'Timestamp when alert was last updated';
