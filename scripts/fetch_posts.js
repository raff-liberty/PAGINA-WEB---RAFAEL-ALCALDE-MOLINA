
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getPosts() {
    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')

    if (error) {
        console.error(error)
        return
    }

    console.log(JSON.stringify(data, null, 2))
}

getPosts()
