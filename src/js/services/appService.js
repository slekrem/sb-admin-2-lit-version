const routeData = [
    {
        name: 'index',
        url: '/',
        layout: 'private'
    },
    {
        name: 'buttons',
        url: '/buttons',
        layout: 'private'
    },
    {
        name: 'cards',
        url: '/cards',
        layout: 'private'
    },
    {
        name: 'colors',
        url: '/colors',
        layout: 'private'
    },
    {
        name: 'borders',
        url: '/borders',
        layout: 'private'
    },
    {
        name: 'animations',
        url: '/animations',
        layout: 'private'
    },
    {
        name: 'others',
        url: '/others',
        layout: 'private'
    },
    {
        name: 'login',
        url: '/login',
        layout: 'public'
    },
    {
        name: 'register',
        url: '/register',
        layout: 'public'
    },
    {
        name: 'forgot',
        url: '/forgot',
        layout: 'public'
    },
    {
        name: '404',
        url: '/404',
        layout: 'private'
    },
    {
        name: 'blank',
        url: '/blank',
        layout: 'private'
    },
    {
        name: 'charts',
        url: '/charts',
        layout: 'private'
    },
    {
        name: 'tables',
        url: '/tables',
        layout: 'private'
    },
    {
        name: 'profile',
        url: '/profile',
        layout: 'private'
    },
];

export function getView(pathname) {

    let actualPath = decodeURI(pathname)
        .toString()
        .replace(/\/$/, '')
        .replace(/^\//, ''),
        baseHref = document.querySelector('base').href.replace(location.origin, '')
            .replace(/\/$/, '')
            .replace(/^\//, '');

    if (actualPath.includes(baseHref))
        actualPath = actualPath.replace(baseHref, '');
    actualPath = actualPath.split('/').filter(String);

    let name = '';
    let urlData = {};
    let layout = '';

    routeData.map(x => {
        if (name) return;
        const expectedPath = decodeURI(x.url)
            .toString()
            .replace(/\/$/, '')
            .replace(/^\//, '')
            .split('/')
            .filter(String);

        if (actualPath.length === expectedPath.length) {
            name = x.name;
            layout = x.layout;
            for (let i = 0; i < expectedPath.length; ++i) {
                const expectedFragment = expectedPath[i],
                    actualFragment = actualPath[i];
                if (actualFragment !== expectedFragment) {
                    if (expectedFragment.startsWith('{') && expectedFragment.endsWith('}')) {
                        const propName = expectedFragment.slice(1, -1);
                        urlData[propName] = actualFragment;
                    } else {
                        name = '';
                        layout = '';
                        urlData = {};
                        break;
                    }
                }
            }
        } else {
            name = '';
            layout = '';
        }
    });

    return { name, urlData, layout };
};