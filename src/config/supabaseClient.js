
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvlywttvcxjwbzbhnsrx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bHl3dHR2Y3hqd2J6Ymhuc3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMzNDE2MjAsImV4cCI6MTk3ODkxNzYyMH0.QrLPL8uk1DOQxCT9xuPD0MuDIR8kBG-p3eaCoQosKSs'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
