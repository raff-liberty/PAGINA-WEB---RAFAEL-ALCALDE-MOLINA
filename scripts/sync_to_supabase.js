
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { blogPosts } from '../src/data/blogPosts.js'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function syncPosts() {
    console.log('--- Iniciando sincronización de posts Engorilaos ---');

    for (const post of blogPosts) {
        console.log(`Sincronizando: ${post.title}...`);

        // Transform local structure to database structure
        const dbPost = {
            slug: post.slug,
            title: post.title,
            category: post.category,
            read_time: post.read_time,
            publish_date: post.publish_date,
            excerpt: post.excerpt,
            content: post.content,
            meta_description: post.excerpt, // Use excerpt as meta_description
            keywords: post.category.toLowerCase()
        };

        const { data, error } = await supabase
            .from('blog_posts')
            .upsert(dbPost, { onConflict: 'slug' });

        if (error) {
            console.error(`Error sincronizando ${post.slug}:`, error.message);
        } else {
            console.log(`✅ Sincronizado: ${post.slug}`);
        }
    }

    console.log('--- Sincronización completada ---');
}

syncPosts();
