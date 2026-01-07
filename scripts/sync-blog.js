
import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../src/data/blogPosts.js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using anon key, might need service role if RLS is strict

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not found in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncPosts() {
    console.log(`🚀 Starting sync of ${blogPosts.length} posts...`);

    for (const post of blogPosts) {
        console.log(`📝 Syncing: ${post.title}...`);

        // We remove the numerical ID if Supabase uses UUIDs or handles IDs differently, 
        // but based on previous logs, keeping similar structure is good.
        // Upsert relies on 'slug' being unique.
        const { data, error } = await supabase
            .from('blog_posts')
            .upsert({
                slug: post.slug,
                title: post.title,
                category: post.category,
                read_time: post.read_time,
                publish_date: post.publish_date,
                savings: post.savings,
                excerpt: post.excerpt,
                content: post.content
            }, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error syncing ${post.slug}:`, error.message);
        } else {
            console.log(`✅ Synced: ${post.slug}`);
        }
    }

    console.log('🏁 Sync finished.');
}

syncPosts();
