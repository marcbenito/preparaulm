-- Add new fields for enhanced dashboard cards
-- Version: 1.4.1
-- Date: 2024-01-15
-- Add minimum_progress field (percentage value)
ALTER TABLE user_category_performance
ADD COLUMN minimum_progress REAL DEFAULT 0;
-- Add confidence field (1-5 scale) 
ALTER TABLE user_category_performance
ADD COLUMN confidence INTEGER DEFAULT 1 CHECK (
        confidence >= 1
        AND confidence <= 5
    );
-- Add comments for documentation
COMMENT ON COLUMN user_category_performance.minimum_progress IS 'Minimum progress percentage required for this category';
COMMENT ON COLUMN user_category_performance.confidence IS 'User confidence level for this category (1-5 scale)';