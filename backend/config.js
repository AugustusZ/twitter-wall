var appSettings = {
    port: 4444,

    wordCollectionFileName: 'word.txt',

    rankSettings: {
        'user': 5,
        'topic': 5,
        'media': 1
    },

    blacklist: [
        'rt',
        'esri',
        'esriuc',
        'read',
        'blog',
        'check',
        'things',
        'find',
        'miss',
        'learn',
        'week',
        'booth',
        'amp',
        'de', // french stopword
        'des', // french stopword
        'il', // french stopword
        '',
    ]
};

module.exports = appSettings;
