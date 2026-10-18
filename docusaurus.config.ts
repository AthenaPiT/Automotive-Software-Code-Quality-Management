import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// Deployment configuration
//   1. Replace GITHUB_USER / GITHUB_REPO with your GitHub username and repo.
//   2. Replace CUSTOM_URL with your personal domain (used for GitHub Pages
//      with a custom domain AND for Cloudflare Pages).
//   3. Keep baseUrl '/' when a custom domain is attached to either host.
// ---------------------------------------------------------------------------
const GITHUB_USER = 'your-github-username';
const GITHUB_REPO = 'code-quality-management';
const CUSTOM_URL = 'https://codequality.yourdomain.com';

const config: Config = {
  title: 'Code Quality Management',
  tagline: 'Automotive Embedded Software Code Quality Assurance Framework',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: CUSTOM_URL,
  baseUrl: '/',

  // GitHub Pages deployment fields (consumed by `docusaurus deploy`)
  organizationName: GITHUB_USER,
  projectName: GITHUB_REPO,
  deploymentBranch: 'gh-pages',

  // Trailing slash off works cleanly on both GitHub Pages and Cloudflare Pages
  trailingSlash: false,

  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/tree/main/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/CodeQuality.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    // Refined typography and reading width
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'Code Quality Management',
      logo: {
        alt: 'Code Quality Management Logo',
        src: 'img/CodeQuality.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Overview', to: '/docs'},
            {label: 'Governance & Framework', to: '/docs/category/governance--framework'},
            {label: 'Engineering Guidelines', to: '/docs/category/engineering-guidelines'},
            {label: 'Assurance, Audit & Release', to: '/docs/category/assurance-audit--release'},
          ],
        },
        {
          title: 'Standards',
          items: [
            {label: 'ASPICE / PAM', href: 'https://www.automotivespice.com/'},
            {label: 'ISO 26262 Functional Safety', href: 'https://www.iso.org/standard/68383.html'},
            {label: 'MISRA C/C++', href: 'https://misra.org.uk/'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub Repository', href: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`},
            {label: 'Docusaurus', href: 'https://docusaurus.io/'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Code Quality Management. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'json', 'yaml', 'c', 'cpp'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
