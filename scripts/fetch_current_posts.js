import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env from the project root
dotenv.config({ path: path.resolve('d:/ANTES DE HACER - RAFAEL web/stitch_homepage/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: Faltan las credenciales de Supabase en el archivo .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const fetchPosts = async () => {
    console.log('Obteniendo posts de Supabase...');

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*');

    if (error) {
        console.error('Error obteniendo posts:', error.message);
    } else {
        fs.writeFileSync('scripts/current_posts.json', JSON.stringify(data, null, 2));
        console.log(`Se han obtenido ${data.length} posts y se han guardado en scripts/current_posts.json`);
    }
};

fetchPosts();
