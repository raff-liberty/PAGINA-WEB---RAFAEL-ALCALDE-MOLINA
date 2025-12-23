import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { blogPosts } from '../src/data/blogPosts.js';
import { sectors } from '../src/data/sectors.js';
import { locations } from '../src/data/locations.js';
import { sectorLocationContent } from '../src/data/sectorLocationContent.js';
import { availabilityConfig } from '../src/data/availability.js';
import { solutionAreas } from '../src/data/solutionAreas.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: VITE_SUPABASE_URL and (VITE_SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY) must be set in .env');
    process.exit(1);
}

if (!process.env.VITE_SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Warning: VITE_SUPABASE_SERVICE_ROLE_KEY not found. Migration might fail due to RLS policies.');
}


const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('Starting migration...');

    // 1. Migrate Sectors
    console.log('Migrating sectors...');
    const { error: sectorsError } = await supabase
        .from('sectors')
        .upsert(sectors.map(s => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            icon: s.icon,
            description: s.description,
            problems: s.problems,
            solutions: s.solutions,
            keywords: s.keywords
        })));
    if (sectorsError) console.error('Error migrating sectors:', sectorsError);

    // 2. Migrate Locations
    console.log('Migrating locations...');
    const { error: locationsError } = await supabase
        .from('locations')
        .upsert(locations.map(l => ({
            id: l.id,
            name: l.name,
            slug: l.slug,
            description: l.description,
            meta_description: l.metaDescription,
            keywords: l.keywords,
            population: l.population,
            context: l.context,
            examples: l.examples
        })));
    if (locationsError) console.error('Error migrating locations:', locationsError);

    // 3. Migrate Blog Posts
    console.log('Migrating blog posts...');
    const { error: blogError } = await supabase
        .from('blog_posts')
        .upsert(blogPosts.map(p => ({
            slug: p.slug,
            title: p.title,
            meta_description: p.metaDescription,
            keywords: p.keywords,
            category: p.category,
            read_time: p.readTime,
            publish_date: p.publishDate,
            excerpt: p.excerpt,
            image: p.image,
            content: p.content
        })), { onConflict: 'slug' });
    if (blogError) console.error('Error migrating blog posts:', blogError);

    // 4. Migrate Sector Location Content
    console.log('Migrating sector-location content...');
    const contentEntries = Object.entries(sectorLocationContent).map(([id, data]) => {
        const [sectorSlug, ...locationRest] = id.split('-');
        const locationSlug = locationRest.join('-');

        return {
            id,
            sector_id: sectorSlug,
            location_id: locationSlug,
            meta_title: data.metaTitle,
            meta_description: data.metaDescription,
            hero_title: data.hero?.title,
            hero_subtitle: data.hero?.subtitle,
            problems: data.problems,
            solutions: data.solutions,
            local_context: data.localContext,
            related_sectors: data.relatedSectors,
            related_locations: data.relatedLocations
        };
    });
    const { error: contentError } = await supabase
        .from('sector_location_content')
        .upsert(contentEntries);
    if (contentError) console.error('Error migrating sector-location content:', contentError);

    // 5. Migrate Availability
    console.log('Migrating availability...');
    const { error: availError } = await supabase
        .from('availability')
        .upsert([{
            allowed_days: availabilityConfig.allowedDays,
            default_time_slots: availabilityConfig.defaultTimeSlots,
            specific_day_config: availabilityConfig.specificDayConfig,
            blocked_dates: availabilityConfig.blockedDates
        }]);
    if (availError) console.error('Error migrating availability:', availError);

    // 6. Migrate Solution Areas
    console.log('Migrating solution areas...');
    const { error: solutionError } = await supabase
        .from('solution_areas')
        .upsert(solutionAreas.map(area => ({
            id: area.id,
            title: area.title,
            icon: area.icon,
            sectors: area.sectors,
            items: area.items
        })));
    if (solutionError) console.error('Error migrating solution areas:', solutionError);

    console.log('Migration finished!');
}

migrate();

