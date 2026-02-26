/**
 * Post-build script: generates per-route HTML files for SEO.
 *
 * Since this is an SPA, we copy the built index.html to each route path
 * so that hosting platforms serve proper HTML for every URL.
 * The React app hydrates client-side and takes over.
 *
 * This ensures:
 * - Crawlers get valid HTML with meta tags for every page
 * - Direct URL access works without server-side rewrites
 * - Social media previews work (OG tags in initial HTML)
 *
 * Usage: node scripts/generate-static.js
 */

import { readFileSync, mkdirSync, writeFileSync, copyFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const SITE_URL = 'https://gotutor.dev'
const SITE_NAME = 'GoTutor - The Complete Go Programming Tutorial'

// All lesson slugs with their metadata for per-page meta tags
const lessons = [
  { slug: 'introduction-to-go', title: 'Introduction to Go', description: 'Learn why Go was created, its key strengths, philosophy, and how to set up your first Go development environment with modules.' },
  { slug: 'variables-types-constants', title: 'Variables, Types & Constants', description: "Master Go's type system including variable declarations, zero values, basic types, type conversions, constants, and iota for enumerated constants." },
  { slug: 'control-flow', title: 'Control Flow', description: 'Learn Go control flow: if/else with init statements, for loops (the only loop), switch statements, type switches, defer, panic, and recover.' },
  { slug: 'functions-closures', title: 'Functions & Closures', description: 'Deep dive into Go functions: multiple return values, variadic functions, closures, method receivers, and the init function pattern.' },
  { slug: 'arrays-slices', title: 'Arrays & Slices', description: 'Understand Go arrays vs slices, slice internals, append, copy, and common slice manipulation patterns for production code.' },
  { slug: 'maps', title: 'Maps', description: 'Master Go maps: creation, CRUD operations, iteration, nil map gotchas, sets, counting, grouping, and ordered iteration patterns.' },
  { slug: 'structs-methods', title: 'Structs & Methods', description: 'Learn Go structs: embedding for composition, struct tags, constructor patterns, functional options, and value vs pointer receiver guidelines.' },
  { slug: 'interfaces', title: 'Interfaces', description: 'Understand Go interfaces: implicit satisfaction, composition, type assertions, type switches, key stdlib interfaces, and the nil interface gotcha.' },
  { slug: 'generics', title: 'Generics', description: 'Master Go generics (1.18+): type parameters, constraints, generic types like Stack, and generic Map/Filter/Reduce utility functions.' },
  { slug: 'goroutines', title: 'Goroutines', description: 'Learn Go goroutines: launching lightweight threads, WaitGroups for synchronization, goroutine lifecycle rules, fan-out, and worker pool patterns.' },
  { slug: 'channels', title: 'Channels', description: 'Master Go channels: buffered vs unbuffered, directional channels, select statements, pipelines, fan-in, semaphores, and done channel patterns.' },
  { slug: 'sync-primitives-context', title: 'Sync Primitives & Context', description: 'Learn sync.Mutex, RWMutex, sync.Once, sync.Map, and the context package for cancellation, deadlines, and request-scoped values.' },
  { slug: 'error-handling-patterns', title: 'Error Handling Patterns', description: 'Master Go error handling: custom error types, error wrapping with %w, sentinel errors, errors.Is/As, and production-grade error patterns.' },
  { slug: 'packages-modules-visibility', title: 'Packages, Modules & Visibility', description: 'Understand Go packages, modules, go.mod, visibility rules, standard project layout, the internal/ directory, and build tags.' },
  { slug: 'working-with-json', title: 'Working with JSON', description: 'Learn Go JSON encoding/decoding: struct tags, marshal/unmarshal, dynamic JSON with RawMessage, custom marshalers, and streaming JSON.' },
  { slug: 'http-servers-clients', title: 'HTTP Servers & Clients', description: 'Build Go HTTP servers with net/http: routing (Go 1.22+), middleware chains, custom HTTP clients, and graceful shutdown patterns.' },
  { slug: 'file-io-os', title: 'File I/O & OS', description: 'Master Go file I/O: reading and writing files, buffered I/O, filepath operations, directory walking, environment variables, and OS operations.' },
  { slug: 'unit-testing-benchmarks', title: 'Unit Testing & Benchmarks', description: 'Learn Go testing: table-driven tests, test helpers, subtests, parallel tests, mocking with interfaces, benchmarks, and the race detector.' },
  { slug: 'database-access-sql', title: 'Database Access & SQL', description: 'Learn Go database access: database/sql, connection pooling, queries, transactions, pgx for PostgreSQL, and the repository pattern.' },
  { slug: 'design-patterns', title: 'Design Patterns in Go', description: 'Implement Go design patterns: dependency injection, builder, strategy, observer/event system, and circuit breaker for resilient services.' },
  { slug: 'reflection-code-generation', title: 'Reflection & Code Generation', description: 'Understand Go reflection, struct tag inspection, go:generate for code generation, go:embed for embedding files, and when to use reflection.' },
  { slug: 'performance-profiling', title: 'Performance & Profiling', description: 'Master Go performance: pprof profiling, memory optimization, sync.Pool, struct padding, race detection, escape analysis, and benchmarking.' },
  { slug: 'logging-observability', title: 'Logging & Observability', description: 'Learn production Go logging with slog (Go 1.21+), structured logging best practices, Prometheus metrics, and health check endpoints.' },
  { slug: 'configuration-deployment', title: 'Configuration & Deployment', description: 'Deploy Go applications: configuration patterns, multi-stage Docker builds, Makefiles, build-time version injection, and cross-compilation.' },
  { slug: 'building-complete-rest-api', title: 'Building a Complete REST API', description: 'Build a production-grade Go REST API: 3-layer architecture (handler, service, repository), project structure, routing, validation, and wiring.' },
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

try {
  const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf-8')

  let generated = 0

  for (const lesson of lessons) {
    const routePath = `lesson/${lesson.slug}`
    const dir = join(distDir, routePath)
    mkdirSync(dir, { recursive: true })

    const fullTitle = `${lesson.title} - Go Tutorial | ${SITE_NAME}`
    const canonicalUrl = `${SITE_URL}/lesson/${lesson.slug}`
    const description = escapeHtml(lesson.description)
    const title = escapeHtml(fullTitle)

    // Replace meta tags in the HTML for this specific page
    let pageHtml = indexHtml
      .replace(
        /<title>[^<]*<\/title>/,
        `<title>${title}</title>`
      )
      .replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${description}"`
      )
      .replace(
        /<meta name="title" content="[^"]*"/,
        `<meta name="title" content="${title}"`
      )
      .replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${canonicalUrl}"`
      )
      .replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${title}"`
      )
      .replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${description}"`
      )
      .replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${canonicalUrl}"`
      )
      .replace(
        /<meta property="og:type" content="[^"]*"/,
        `<meta property="og:type" content="article"`
      )
      .replace(
        /<meta name="twitter:title" content="[^"]*"/,
        `<meta name="twitter:title" content="${title}"`
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*"/,
        `<meta name="twitter:description" content="${description}"`
      )
      .replace(
        /<meta name="twitter:url" content="[^"]*"/,
        `<meta name="twitter:url" content="${canonicalUrl}"`
      )

    writeFileSync(join(dir, 'index.html'), pageHtml)
    generated++
  }

  // Also create a 404.html from the base index.html (for hosting platforms)
  copyFileSync(join(distDir, 'index.html'), join(distDir, '404.html'))

  console.log(`Generated ${generated} static HTML pages + 404.html`)
} catch (err) {
  console.error('Error generating static pages:', err)
  process.exit(1)
}
