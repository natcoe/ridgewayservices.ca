const projects = [
  {
    slug: 'dogtopia',
    title: 'Dogtopia',
    url: '/projects/commercial/daycare/dogtopia/'
  },
  {
    slug: 'cefa',
    title: 'CEFA',
    url: '/projects/commercial/daycare/CEFA/'
  },
  {
    slug: 'bo-li-laser',
    title: 'Bo Li Laser Eye Clinic',
    url: '/projects/commercial/offices/bo-li-laser-eye-clinic/'
  },
  {
    slug: 'forward-house',
    title: 'Forward House',
    url: '/projects/commercial/offices/forward-house/'
  },
  {
    slug: 'scm-insurance',
    title: 'SCM Insurance',
    url: '/projects/commercial/offices/SCM-insurance/'
  },
  {
    slug: 'fat-bastard',
    title: 'Fat Bastard',
    url: '/projects/commercial/restaurants/fat-bastard/'
  },
  {
    slug: 'taco-bell',
    title: 'Taco Bell',
    url: '/projects/commercial/restaurants/taco-bell/'
  },
  {
    slug: 'bone-biscuit',
    title: 'Bone & Biscuit',
    url: '/projects/commercial/retail/bone-and-biscuit/'
  },
  {
    slug: '2110-keele',
    title: '2110 Keele',
    url: '/projects/residential/2110-keele/'
  },
  {
    slug: 'saranac-apts',
    title: 'Saranac Apartments',
    url: '/projects/residential/saranac-apartments/'
  }
];

module.exports = function () {
  const nav = {};

  projects.forEach((project, index) => {
    const prev = index > 0 ? projects[index - 1] : null;
    const next = index < projects.length - 1 ? projects[index + 1] : null;

    nav[project.slug] = {
      prev: prev ? { title: prev.title, url: prev.url } : null,
      next: next ? { title: next.title, url: next.url } : null
    };
  });

  return nav;
};
