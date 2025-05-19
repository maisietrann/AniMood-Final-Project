// supabase.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://wdycujqqwofiotpnzriu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeWN1anFxd29maW90cG56cml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1OTg0MDEsImV4cCI6MjA2MzE3NDQwMX0.uWmfRUGZ_9OxZ77ZkJmx7KxOR1Plhzusdgs2u-Syoxg'
);
