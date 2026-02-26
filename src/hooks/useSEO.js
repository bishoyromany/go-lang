import { useEffect } from 'react'
import { SITE_URL, SITE_NAME } from '../data/tutorials'

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`) ||
           document.querySelector(`meta[property="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    if (name.startsWith('og:') || name.startsWith('article:')) {
      el.setAttribute('property', name)
    } else {
      el.setAttribute('name', name)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function setJsonLd(id, data) {
  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function useSEO({ title, description, path, type = 'article', lesson = null }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const canonicalUrl = `${SITE_URL}${path}`

    document.title = fullTitle

    setMeta('description', description)

    // Open Graph
    setMeta('og:title', fullTitle)
    setMeta('og:description', description)
    setMeta('og:url', canonicalUrl)
    setMeta('og:type', type === 'home' ? 'website' : 'article')
    setMeta('og:site_name', SITE_NAME)
    setMeta('og:locale', 'en_US')
    setMeta('og:image', `${SITE_URL}/og-image.png`)

    // Twitter
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
    setMeta('twitter:image', `${SITE_URL}/og-image.png`)

    // Canonical
    setCanonical(canonicalUrl)

    // Structured data for lesson pages
    if (lesson) {
      setJsonLd('ld-article', {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: lesson.title,
        description: lesson.description,
        url: canonicalUrl,
        datePublished: '2025-01-01',
        dateModified: '2025-06-01',
        author: {
          '@type': 'Organization',
          name: 'GoTutor',
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'GoTutor',
          url: SITE_URL,
        },
        inLanguage: 'en',
        isPartOf: {
          '@type': 'Course',
          name: SITE_NAME,
          url: SITE_URL,
          description: 'A comprehensive Go programming tutorial covering 25 lessons from basics to production deployment.',
          provider: {
            '@type': 'Organization',
            name: 'GoTutor',
          },
        },
        educationalLevel: lesson.difficulty === 'beginner' ? 'Beginner' :
                          lesson.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced',
        timeRequired: `PT${parseInt(lesson.duration)}M`,
        proficiencyLevel: lesson.difficulty === 'beginner' ? 'Beginner' :
                          lesson.difficulty === 'intermediate' ? 'Intermediate' : 'Expert',
      })

      // BreadcrumbList
      setJsonLd('ld-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lesson.module,
            item: `${SITE_URL}/#${lesson.module.toLowerCase().replace(/\s+/g, '-')}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: lesson.title,
            item: canonicalUrl,
          },
        ],
      })
    }

    return () => {
      // cleanup JSON-LD on unmount
      const articleLd = document.getElementById('ld-article')
      const breadcrumbLd = document.getElementById('ld-breadcrumb')
      if (articleLd) articleLd.remove()
      if (breadcrumbLd) breadcrumbLd.remove()
    }
  }, [title, description, path, type, lesson])
}
