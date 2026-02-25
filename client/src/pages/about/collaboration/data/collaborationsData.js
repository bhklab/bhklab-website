// src/data/collaborationsData.js

export const collaborationsRaw = [
    // ✅ Paste the exact array you sent me here (all objects)
    // Example first item:
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec5f'
        },
        'main-collab': 'Amos Bairoch',
        'other-collabs': 'NA',
        organization: 'Cellosaurus',
        country: 'Switzerland',
        city: 'Geneva',
        'start-year': 2019,
        type: 'Joint',
        project: 'PharmacoDB linkage',
        contact: 'Sisira Kadambat Nair',
        members: 'Petr Smirnov, Gangesh Beri',
        role: 'Shared mapping data from PharmacoDB to Cellosaurus',
        status: '\u2705 Completed',
        outputs: 'Data successfully linked',
        latitude: 46.2044,
        longitude: 6.1432
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec60'
        },
        'main-collab': 'Tero Aittokallio',
        'other-collabs': 'Sanna H Timonen, Satu M Mustjoki',
        organization: 'FIMM',
        country: 'Finland',
        city: 'Helsinki',
        'start-year': 2020,
        type: 'Task Expertise',
        project: 'JAKSTAT resource building',
        contact: 'Minoru Nakano, Sisira Kadambat Nair',
        members: 'NA',
        role: 'Build JAKSTAT website, Hetzner cost mgmt',
        status: '\u2705 Completed',
        outputs: "Hetzner was handed over to Tero's group in 2024",
        latitude: 60.1695,
        longitude: 24.9354
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec61'
        },
        'main-collab': 'Lincoln Stein',
        'other-collabs': 'Marija Orlic-Milacic (OICR) and Bijay Jassal (EBI, UK)',
        organization: 'OICR / Reactome',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2021,
        type: 'Task Expertise',
        project: 'Pathway curation review',
        contact: 'Sisira Kadambat Nair',
        members: 'NA',
        role: 'External reviewer',
        status: '\u2705 Completed',
        outputs: 'External reviewer for 3 pathways curated by Reactome',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec62'
        },
        'main-collab': 'Antoaneta Vladimirova',
        'other-collabs': 'Fanny Sie, Sofija Spasojevic',
        organization: 'Roche',
        country: 'United States of America',
        city: 'Indianapolis',
        'start-year': 2022,
        type: 'Bilateral Contract',
        project: 'RNA-based Drug Response Prediction',
        contact: 'BHK',
        members: 'Petr Smirnov, Farnoosh Babazadeh, Sisira, Nikta, Ian Smith, Emily So, Chris Eeles',
        role: 'Developed framework based on univariable biomarker pipeline.',
        status: '\u2705 Completed',
        outputs: 'Shared datasets, code and other deliverables',
        latitude: 39.7684,
        longitude: -86.1581
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec63'
        },
        'main-collab': 'InstitutRoche',
        'other-collabs': 'Cameron Mcpherson, Laurent-Phillippe Albou',
        organization: 'InstitutRoche iCAAN/imCORE',
        country: 'France',
        city: 'Boulogne-Billancourt',
        'start-year': 2022,
        type: 'Joint',
        project: 'Workshop support',
        contact: 'BHK',
        members: 'Farnoosh Babazadeh, Sisira,Minoru Nakano',
        role: 'Workshop prep + statistical support + follow-up manuscripts',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'Supported manuscript follow-up',
        latitude: 48.8322,
        longitude: 2.2411
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec64'
        },
        'main-collab': 'LMS SPORE',
        'other-collabs': 'NA',
        organization: 'Michigan U',
        country: 'United States of America',
        city: 'Ann Arbor',
        'start-year': 2022,
        type: 'Partnerships',
        project: 'Genetics and Genomics of Leiomyosarcoma (LMS)',
        contact: 'BHK',
        members: 'Farnoosh, Caryn, Sisira, Jermiah',
        role: 'BHK is part of DAC. Lab performs data access, storage, curation and analysis',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 42.2808,
        longitude: -83.743
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec65'
        },
        'main-collab': 'Tero Aittokallio',
        'other-collabs': 'Heidi Neubauer, Aleksandr Ianevski',
        organization: 'FIMM',
        country: 'Finland',
        city: 'Helsinki',
        'start-year': 2023,
        type: 'Task Expertise',
        project: 'TCL-38 Storage mgmt, TCL cell lines',
        contact: 'Julia Nguyen',
        members: 'Sisira, Matthew Boccalon',
        role: 'TCL cell line curation',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'TCL-38 paper in progress',
        latitude: 60.1695,
        longitude: 24.9354
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec66'
        },
        'main-collab': 'Marc Hafner',
        'other-collabs': 'Bartek Czech, Marek Brys',
        organization: 'Genentech gDR',
        country: 'United States of America',
        city: 'San Francisco',
        'start-year': 2023,
        type: 'Joint',
        project: 'Drug screening',
        contact: 'Jermiah Joseph',
        members: 'NA',
        role: 'Linkage of gDR-PharmacoGx',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 37.7749,
        longitude: -122.4194
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec67'
        },
        'main-collab': 'Frank Currie',
        'other-collabs': 'Farrah Pirani, Mohammed Nofal',
        organization: 'Google Cloud Platform',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2023,
        type: 'Partnerships',
        project: 'Infrastructure setup',
        contact: 'BHK',
        members: 'Sisira, Matthew Boccalon, Jermiah Joseph',
        role: 'Coordinated training & setup',
        status: '\u2705 Completed',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec68'
        },
        'main-collab': 'PMATCH Team',
        'other-collabs': 'Trevor Pugh, Bo Wang, CDI labs',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2023,
        type: 'Heterogeneous ',
        project: 'PMATCH',
        contact: 'Paul Brogee',
        members: 'Matthew, Farnoosh, Michael Tran, Kevin Wang, Sisira',
        role: 'Implement PRIORITIZER',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec69'
        },
        'main-collab': 'Natalie Szudy',
        'other-collabs': 'Integrate.io, Bitnobi teams',
        organization: 'DHDP Federated Learning',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2024,
        type: 'Task Expertise',
        project: 'PredictIO FL pilot',
        contact: 'Farnoosh Babazadeh',
        members: 'Sisira, Matthew Boccalon',
        role: 'Share scripts, assist in setting up FL with integrate.io and Bitnobi',
        status: '\u2705 Completed',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6a'
        },
        'main-collab': 'Scott Bratman Lab',
        'other-collabs': 'Danae Chen',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2024,
        type: 'Task Expertise',
        project: 'IAP biomarker analysis',
        contact: 'Sisira Kadambat Nair',
        members: 'Nikta Feizi',
        role: 'Student supervision',
        status: '\u2705 Completed',
        outputs: 'Statistical analysis run',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6b'
        },
        'main-collab': 'Linda Penn Lab',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Task Expertise',
        project: 'Statin manuscript',
        contact: 'James Bannon',
        members: 'Sisira',
        role: 'Manuscript support',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'Helping complete Wail\u2019s work',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6c'
        },
        'main-collab': 'CCS XevaDB',
        'other-collabs': 'Ming Tsao, Dave Cescon, Morag Park, Matthieu Lupien labs',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Heterogeneous ',
        project: 'Develop Xeva and XevaDB using PMLB & McGill PDX data',
        contact: 'Sisira Kadambat Nair',
        members: 'Jermiah, Matthew, Guanqiao',
        role: 'Lead planning, deliver on milestones, reporting',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'Reporting, hiring, outreach ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6d'
        },
        'main-collab': 'Kieran Campbell',
        'other-collabs': 'NA',
        organization: 'U of T',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Co-supervision',
        project: 'Prediction of tumor mutational burden (TMB)',
        contact: 'Nasim BondarSahebi',
        members: 'NA',
        role: 'Leading the computational development and benchmarking of ML models to predict TMB from bulk and single-cell gene expression. This includes identifying minimal predictive gene signatures, evaluating cancer type\u2013specific models, integrating xTMB with existing immune response signatures, and supporting the design of a multiplexed imaging panel for experimental validation.',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6e'
        },
        'main-collab': 'Philippe Bedard',
        'other-collabs': 'Trevor Pugh, QIPCM, Celeste Yu',
        organization: 'PM, UHN, MOHCCN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2021,
        type: 'Joint',
        project: 'OCTANE',
        contact: 'BHK',
        members: 'Katy Scott',
        role: 'Radiogenomic analysis',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec6f'
        },
        'main-collab': 'Andrew Hope',
        'other-collabs': 'Amber Simpson, Julia Publicover, QIPCM, Miran Kenk, JDMI, Bo Wang ',
        organization: "PM, UHN, Queen's",
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Heterogeneous',
        project: 'AI-Augmented Response Assessment',
        contact: 'Katy Scott',
        members: 'Caryn Geady, Joshua Siraj',
        role: 'Leading the project',
        status: '\ud83d\udd1cNot started',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec70'
        },
        'main-collab': 'Ruben Armananzas',
        'other-collabs': 'Marcos Lopez-De-Castro',
        organization: 'DATAI, UNav',
        country: 'Spain',
        city: 'Pamplona',
        'start-year': 2025,
        type: 'Partnerships',
        project: 'Conformal Feature Selection in IO response prediction',
        contact: 'BHK',
        members: 'Farnoosh, Kewei',
        role: 'Co-authorship',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 42.8125,
        longitude: -1.6458
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec7c'
        },
        'main-collab': 'Rama Khokha',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2020,
        type: 'Co-supervision',
        project: 'Unraveling targetable hub proteins in pancreatic cancer',
        contact: 'Foram Vyas',
        members: 'Foram Vyas',
        role: 'Developing hub protein pipeline',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec71'
        },
        'main-collab': 'John Stagg',
        'other-collabs': 'NA',
        organization: 'Universit\u00e9 de Montr\u00e9al',
        country: 'Canada',
        city: 'Montreal',
        'start-year': 2025,
        type: 'Task Expertise',
        project: 'PAR2 manuscript',
        contact: 'BHK',
        members: 'Farnoosh ',
        role: 'Co-authorship',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 45.5017,
        longitude: -73.5673
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec72'
        },
        'main-collab': 'Robert Tibshirani',
        'other-collabs': 'Jing Shang',
        organization: 'Stanford University',
        country: 'United States of America',
        city: 'Stanford',
        'start-year': 2025,
        type: 'Task Expertise',
        project: 'Method Development - AdaForest',
        contact: 'James Bannon',
        members: 'NA',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 37.4275,
        longitude: -122.1697
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec73'
        },
        'main-collab': 'Carlos Meca, Jeroen Cant, Ludivine Libert',
        'other-collabs': 'NA',
        organization: 'radiomics.bio',
        country: 'Belgium',
        city: 'Li\u00e8ge',
        'start-year': 2025,
        type: 'Bilateral Contract',
        project: 'Validation of Hypoxia Signature',
        contact: 'Caryn Geady',
        members: 'Caryn Geady',
        role: 'Leading the project',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'Research agreement in review',
        latitude: 50.6326,
        longitude: 5.5797
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec74'
        },
        'main-collab': 'Housheng Hansen He',
        'other-collabs': 'NA',
        organization: 'U of T, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2022,
        type: 'Co-supervision',
        project:
            'Data-driven investigation of the pan-cancer functional landscape and clinical significance of circular RNAs',
        contact: 'Peter Her',
        members: 'Peter Her',
        role: 'Leading the project',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec75'
        },
        'main-collab': 'Khadija Jafarova',
        'other-collabs': 'Ming Tsao',
        organization: 'U of T, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2024,
        type: 'Heterogeneous',
        project: 'PRMT5 induced alternative splicing shifts in resistant vs sensitive NSCLC organoids',
        contact: 'Peter Her',
        members: 'Peter Her',
        role: 'Alternative splicing analysis ',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec76'
        },
        'main-collab': 'Aled Edwards',
        'other-collabs': 'Matthieu Schapira, Alexander Tropsha,  James Wellnitz,  Rafael M. Cou\u00f1ago',
        organization: 'Structural Genomics Consortium',
        country: 'Canada',
        City: 'Toronto',
        'start-year': 2024,
        type: 'Heterogeneous',
        project: 'Aircheck  platform for hit discovery',
        contact: 'BHK',
        members: 'Nabin Bagale, Shaghayegh Reza',
        role: 'Making a platform for data storage, data analysis, ML modeling and colaboration',
        status: '\ud83d\udfe1 Ongoing'
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec77'
        },
        'main-collab': 'Arndt Vogel',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Heterogeneous',
        project: 'Bile ctDNA cholangiocarcinoma foundation grant',
        contact: 'Kevin Wang',
        members: 'Kevin Wang',
        role: 'Analysis of bile ctDNA and build model for tumour prediction',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec78'
        },
        'main-collab': 'Robert Grant',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2024,
        type: 'Heterogeneous',
        project: 'Clinicogenomic Characterization of Primary Sclerosing',
        contact: 'Kevin Wang',
        members: 'Kevin Wang, Farnoosh',
        role: 'Transcriptomic analysis and predict-IO',
        status: '\u2705 Completed',
        outputs: 'Manuscript under review',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec79'
        },
        'main-collab': 'Robert Grant',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Heterogeneous',
        project: 'HistoGx',
        contact: 'Kevin Wang',
        members: 'Kevin Wang, Kewei',
        role: 'Develop path AI pipeline',
        status: '\ud83d\udfe1 Ongoing',
        outputs: 'MOHCCN data science award',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec7a'
        },
        'main-collab': 'Scott Bratman Lab',
        'other-collabs': 'NA',
        organization: 'PM, UHN',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2025,
        type: 'Co-supervision',
        project: '6bp sequencing for brain tumors',
        contact: 'Kevin Wang',
        members: 'Kevin Wang, TBD student',
        role: 'Develop 6bp pipeline',
        status: '\ud83d\udd1cNot started',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec7b'
        },
        'main-collab': 'Jim Woodgett',
        'other-collabs': 'NA',
        organization: 'LTRI',
        country: 'Canada',
        city: 'Toronto',
        'start-year': 2024,
        type: 'Co-supervision',
        project: 'PI3K and Wnt pathway cooperation in TNBC',
        contact: 'Junye Che',
        members: 'Junye Che',
        role: 'Generating cell line models ',
        status: '\ud83d\udfe1 Ongoing',
        latitude: 43.651,
        longitude: -79.347
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec7d'
        },
        'main-collab': 'Anne Carpenter',
        'other-collabs': 'NA',
        organization: 'Broad Institute of Harvard and MIT',
        country: 'United States of America',
        city: 'Cambridge',
        'start-year': 2024,
        type: 'Task Expertise',
        project: 'MorphoDiff paper',
        contact: 'BHK',
        members: 'Zeinab Navidi',
        role: 'Co-authorship, validation biological analysis',
        status: '\u2705 Completed',
        outputs: 'Paper published at ICLR 2025',
        latitude: 42.3736,
        longitude: -71.1097
    },
    {
        _id: {
            $oid: '6852ba5d1301f3572736ec7e'
        },
        'main-collab': 'Beth Cimini',
        'other-collabs': ' Esteban Miglietta, Le Liu',
        organization: 'Broad Institute of Harvard and MIT',
        country: 'United States of America',
        city: 'Cambridge',
        'start-year': 2024,
        type: 'Task Expertise',
        project: 'MorphoDiff paper',
        contact: 'BHK',
        members: 'Zeinab Navidi',
        role: 'Co-authorship, validation biological analysis',
        status: '\u2705 Completed',
        outputs: 'Paper published at ICLR 2025',
        latitude: 42.3736,
        longitude: -71.1097
    }

    // ... paste the rest of your records here ...
];
