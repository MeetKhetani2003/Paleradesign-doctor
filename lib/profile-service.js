import { connectToDatabase } from './mongodb';
import Profile from './models/Profile';
import { DEFAULT_PROFILES } from './default-profiles';

// In-memory store for fallback mode
let inMemoryProfiles = JSON.parse(JSON.stringify(DEFAULT_PROFILES));

function toPlainObject(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getAllProfiles() {
  try {
    const { conn, isFallback } = await connectToDatabase();
    if (isFallback || !conn) {
      return toPlainObject(inMemoryProfiles.map(p => ({
        slug: p.slug,
        name: p.name,
        designation: p.designation,
        avatarUrl: p.avatarUrl,
        updatedAt: p.updatedAt || new Date().toISOString(),
        views: p.meta?.views || 0
      })));
    }

    const profiles = await Profile.find({}).sort({ updatedAt: -1 }).lean();
    if (profiles.length === 0) {
      // Seed default profiles if database is empty
      await Profile.insertMany(DEFAULT_PROFILES);
      return toPlainObject(DEFAULT_PROFILES.map(p => ({
        slug: p.slug,
        name: p.name,
        designation: p.designation,
        avatarUrl: p.avatarUrl,
        updatedAt: new Date().toISOString(),
        views: p.meta?.views || 0
      })));
    }

    return toPlainObject(profiles);
  } catch (err) {
    console.warn('[getAllProfiles fallback]', err.message);
    return toPlainObject(inMemoryProfiles);
  }
}

export async function getProfileBySlug(slug) {
  const cleanSlug = slug.toLowerCase().trim();

  try {
    const { conn, isFallback } = await connectToDatabase();

    if (isFallback || !conn) {
      const found = inMemoryProfiles.find(p => p.slug === cleanSlug);
      if (!found) return null;
      return toPlainObject(found);
    }

    let profile = await Profile.findOne({ slug: cleanSlug }).lean();
    if (!profile) {
      // Check if it's one of the defaults to seed on-demand
      const defaultProfile = DEFAULT_PROFILES.find(p => p.slug === cleanSlug);
      if (defaultProfile) {
        profile = await Profile.create(defaultProfile);
        return toPlainObject(profile);
      }
      return null;
    }

    return toPlainObject(profile);
  } catch (err) {
    console.warn(`[getProfileBySlug fallback for ${cleanSlug}]`, err.message);
    const found = inMemoryProfiles.find(p => p.slug === cleanSlug);
    return toPlainObject(found);
  }
}

export async function saveProfile(slug, profileData) {
  const cleanSlug = (slug || profileData.slug).toLowerCase().trim();

  try {
    const { conn, isFallback } = await connectToDatabase();

    if (isFallback || !conn) {
      const index = inMemoryProfiles.findIndex(p => p.slug === cleanSlug);
      const updated = {
        ...profileData,
        slug: cleanSlug,
        updatedAt: new Date().toISOString()
      };
      if (index >= 0) {
        inMemoryProfiles[index] = updated;
      } else {
        inMemoryProfiles.unshift(updated);
      }
      return toPlainObject(updated);
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { slug: cleanSlug },
      { ...profileData, slug: cleanSlug },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return toPlainObject(updatedProfile);
  } catch (err) {
    console.warn(`[saveProfile fallback for ${cleanSlug}]`, err.message);
    const index = inMemoryProfiles.findIndex(p => p.slug === cleanSlug);
    const updated = {
      ...profileData,
      slug: cleanSlug,
      updatedAt: new Date().toISOString()
    };
    if (index >= 0) {
      inMemoryProfiles[index] = updated;
    } else {
      inMemoryProfiles.unshift(updated);
    }
    return toPlainObject(updated);
  }
}

export async function deleteProfile(slug) {
  const cleanSlug = slug.toLowerCase().trim();

  try {
    const { conn, isFallback } = await connectToDatabase();

    if (isFallback || !conn) {
      inMemoryProfiles = inMemoryProfiles.filter(p => p.slug !== cleanSlug);
      return true;
    }

    await Profile.deleteOne({ slug: cleanSlug });
    return true;
  } catch (err) {
    console.warn(`[deleteProfile fallback for ${cleanSlug}]`, err.message);
    inMemoryProfiles = inMemoryProfiles.filter(p => p.slug !== cleanSlug);
    return true;
  }
}
