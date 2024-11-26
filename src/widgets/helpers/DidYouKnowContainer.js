import './styles.css';
import { localStorageService } from '@/services';
import {
  boomioLogo,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12,
  item13,
  item14,
  item15,
  item16,
  item17,
  item18,
  item19,
  item20,
  item21,
  item22,
  item23,
  item1Paper,
  item2Paper,
  item3Paper,
  item4Paper,
  item5Paper,
  item6Paper,
  item7Paper,
  item8Paper,
  item9Paper,
  item10Paper,
  item11Paper,
  item12Paper,
  item13Paper,
  item14Paper,
  item15Paper,
  item16Paper,
  item17Paper,
  item18Paper,
  item19Paper,
  item20Paper,
  item21Paper,
  item22Paper,
  item23Paper,
  item1Glass,
  item2Glass,
  item3Glass,
  item4Glass,
  item5Glass,
  item6Glass,
  item7Glass,
  item8Glass,
  item9Glass,
  item10Glass,
  item11Glass,
  item12Glass,
  item13Glass,
  item14Glass,
  item15Glass,
  item16Glass,
  item17Glass,
  item18Glass,
  item19Glass,
  item20Glass,
  item21Glass,
  item22Glass,
  item23Glass,
  item1PienoZvaigzdes,
  item2PienoZvaigzdes,
  item5PienoZvaigzdes,
  item7PienoZvaigzdes,
  item8PienoZvaigzdes,
  item15PienoZvaigzdes,
  item1pegasas,
  item2pegasas,
  item3pegasas,
  item4pegasas,
  item5pegasas,
  item6pegasas,
  item7pegasas,
  item8pegasas,
  item9pegasas,
  item10pegasas,
  item11pegasas,
  item12pegasas,
  item1Pigu,
  item2Pigu,
  item3Pigu,
  item4Pigu,
  item5Pigu,
  item6Pigu,
  item7Pigu,
  item8Pigu,
  item9Pigu,
  item10Pigu,
  item11Pigu,
  item12Pigu,
  item13Pigu,
  item14Pigu,
  item15Pigu,
  item16Pigu,
  item17Pigu,
  item18Pigu,
  item19Pigu,
  item20Pigu,
  item21Pigu,
  item22Pigu,
  item23Pigu,
  item24Pigu,
  item25Pigu,
  item26Pigu,
  item27Pigu,
} from './constants';

export class DidYouKnowContainer {
  constructor(prop) {
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    const currentPageUrl = window.location.href;

    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    this.prop = prop;

    if (this.prop === 'Pigu.lt') {
      this.collectables = [
        item1Pigu,
        item2Pigu,
        item3Pigu,
        item4Pigu,
        item5Pigu,
        item6Pigu,
        item7Pigu,
        item8Pigu,
        item9Pigu,
        item10Pigu,
        item11Pigu,
        item12Pigu,
        item13Pigu,
        item14Pigu,
        item15Pigu,
        item16Pigu,
        item17Pigu,
        item18Pigu,
        item19Pigu,
        item20Pigu,
        item21Pigu,
        item22Pigu,
        item23Pigu,
        item24Pigu,
        item25Pigu,
        item26Pigu,
        item27Pigu,
      ];
    } else if (this.prop && this.prop.includes('Plastic')) {
      this.collectables = [
        item16,
        item4,
        item14,
        item1,
        item23,
        item20,
        item10,
        item8,
        item6,
        item12,
        item19,
        item7,
      ];
    } else if (this.prop && this.prop.includes('Paper')) {
      // Handle Paper collectables
      this.collectables = [
        item16Paper,
        item4Paper,
        item14Paper,
        item1Paper,
        item23Paper,
        item20Paper,
        item10Paper,
        item8Paper,
        item6Paper,
        item12Paper,
        item19Paper,
        item7Paper,
      ];
    } else if (this.prop && this.prop.includes('Glass')) {
      // Handle Glass collectables
      this.collectables = [
        item16Glass,
        item4Glass,
        item14Glass,
        item1Glass,
        item23Glass,
        item20Glass,
        item10Glass,
        item8Glass,
        item6Glass,
        item12Glass,
        item19Glass,
        item7Glass,
      ];
    } else if (this.prop === 'Pieno Žvaigždės') {
      // Handle Glass collectables
      this.collectables = [
        item15PienoZvaigzdes,
        item1PienoZvaigzdes,
        item8PienoZvaigzdes,
        item2PienoZvaigzdes,
        item7PienoZvaigzdes,
        item5PienoZvaigzdes,
      ];
    } else if (this.prop === 'Pegasas') {
      // Handle Glass collectables
      this.collectables = [
        item1pegasas,
        item2pegasas,
        item3pegasas,
        item4pegasas,
        item5pegasas,
        item6pegasas,
        item7pegasas,
        item8pegasas,
        item9pegasas,
        item10pegasas,
        item11pegasas,
        item12pegasas,
      ];
    }
    this.collectablesLinks = [];
    if (this.campaignUrlProp === 'https://pigu.lt' && this.language === 'RU') {
      this.collectablesLinks = [
        {
          url: 'https://pigu.lt/lt/buitine-technika-elektronika/virtuves-iranga/gruzdintuves/xiaomi-smart-air-fryer-pro-4l-eu?id=68496581',
          title: 'Аэрофритюрница Xiaomi Smart Air Fryer Pro EU Power 1600 W',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/namu-technika/dulkiu-siurbliai-robotai/dulkiu-siurblys-robotas-xiaomi-x10-plus?id=69698901',
          title:
            'Робот-пылесос Xiaomi X10 Plus., С функцией влажной уборки, Автоматическая очистка',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/namu-technika/dulkiu-siurbliai-sluotos/dulkiu-siurblys-sluota-dyson-v15s-detect-submarine?id=77534559',
          title: 'Пылесос - метла Dyson V15s Detect Submarine',
        },
        {
          url: 'https://pigu.lt/lt/plansetiniai-kompiuteriai/plansetes-tablets/plansetinis-kompiuteris-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=78014478',
          title: 'Планшет Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://pigu.lt/lt/mobilieji-telefonai/telefonas-xiaomi-redmi-note-13-pro-8256gb-midnight?id=79358438',
          title: 'Телефон Xiaomi Redmi Note 13 Pro 8GB|256GB Midnight Black',
        },
        {
          url: 'https://pigu.lt/lt/televizoriai/televizorius-samsung-qe43q60dauxxh?id=81244960',
          title: 'Телевизор Samsung QE43Q60DAUXXH, 43" (~109 см)',
        },
        {
          url: 'https://pigu.lt/lt/monitoriai/monitorius-lg-gaming-monitor-27gp850p-b-27-ips?id=41176278',
          title: "Монитор LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://pigu.lt/lt/zaidimu-konsoles-kompiuteriai-xbox-sony-playstation-nintendo/zaidimu-konsole-playstation-5-slim-disc?id=78321443',
          title: 'Игровая приставка Playstation 5 Slim Disc',
        },
        {
          url: 'https://pigu.lt/lt/kompiuterine-technika/kompiuteriu-komponentai-ir-kt/ausines-mikrofonai/apple-airpods-2nd-generation-mv7n2zma?id=26378705',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/dantu-sepeteliai/dantu-sepetelis-oral-b-io6-series-black-onyx?id=47550772',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://pigu.lt/lt/vezimeliai/universalus-vezimelis-kinderkraft-moov-2-air-3in1?id=85853785',
          title: 'Универсальная коляска Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-elektronika/mikrobangu-krosneles/beko-moc20100bfb?id=62600643',
          title: 'Beko MOC20100BFB',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/virtualus-augintinis-holograma-spin-master-bitzee-magicals?id=90440246',
          title: 'Виртуальный питомец-голограмма Spin Master Bitzee Magicals',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/42156-lego-technic-peugeot-9x8-24h-le?id=71302661',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Гибридный гиперкар',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/plaukams/plauku-tiesinimo-prietaisai/dyson-airstrait-ht01?id=81137400',
          title: 'Утюжок для волос Dyson Airstrait HT01',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-mergaitems/leles-barbie-automobilis-dream-dreamcamper?id=55744914',
          title: 'Mattel - Barbie Dream Dreamcamper Vehicle',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/zaislinis-sautuvas-nerf-elite-20-shockwave-rd?id=34791654',
          title: 'Игрушечный пистолет Nerf Elite 2.0 Shockwave RD-15, синий',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-mergaitems/leliu-namas-mattel-hrj77?id=83925700',
          title: 'Кукольный домик Mattel HRJ77',
        },
        {
          url: 'https://pigu.lt/lt/grozis-ir-mada/kosmetika/plauku-prieziurai/sampunai/plauku-prieziuros-priemoniu-rinkinys-tigi-bed-head?id=5251150',
          title:
            'Набор для ухода за волосами Tigi Bed Head Resurrection: шампунь 750 мл + бальзам 750 мл',
        },
        {
          url: 'https://pigu.lt/lt/kvepalai-pigiau/kvepalai-vyrams/tualetinis-vanduo-armaf-club-de-nuit-intense?id=24160840',
          title: 'Туалетная вода Armaf Club de Nuit Intense EDT для мужчин 105 мл',
        },
        {
          url: 'https://pigu.lt/lt/mobilieji-telefonai-foto-ir-video/ismanieji-laikrodziai-ir-ismaniosios-apyrankes/ismaniosios-apyrankes-fitness-tracker/ismanioji-apyranke-huawei-watch-fit-2-active-midnight-black?id=55413289',
          title: 'Смарт-браслет Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://pigu.lt/lt/priemones-nuo-plauku-slinkimo-stiprinimui/kauke-molekuliniam-plauku-atstatymui-k18-50-ml?id=49066209',
          title:
            'Несмываемая маска для молекулярного восстановления волос K18 Peptide™ Mask, 50 мл',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/10311-lego-icons-orchideja?id=54051889',
          title: '10311 LEGO® Icons Орхидея',
        },
        {
          url: 'https://pigu.lt/lt/kremai/veido-prieziuros-rinkinys-lumene-lumo-berry-smooth?id=95759268',
          title:
            'Набор для ухода за лицом Lumene Lumo Berry Smooth: Vegan Collagen эссенция, 30 мл + дневной крем, 50 мл',
        },
        {
          url: 'https://pigu.lt/lt/priemones-nuo-plauku-slinkimo-stiprinimui/atkuriamoji-plauku-kauke-k18-professional-molecular-repair?id=49066214',
          title: 'Восстанавливающая маска для волос K18 Professional Molecular Repair, 150 мл',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/plaukams/plauku-tiesinimo-prietaisai/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=91906390',
          title:
            'Набор для ухода за волосами Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://pigu.lt/lt/paltai-moterims/icepeak-moteriskas-zieminis-paltas-pittsfield-juodas?id=85334865',
          title: 'Женское зимнее пальто Icepeak ADDIA, черный цвет',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/radijo-bangomis-valdomas-automobilis-monster-jam?id=94313763',
          title: 'Радиоуправляемая машина Monster Jam',
        },
        {
          url: 'https://pigu.lt/lt/gyvunu-prekes/katems/draskykles/draskykle-katems-villa-delux-tamsiai-pilka-140?id=42602753',
          title: 'Когтеточка для кошек Villa Delux, темно-серый цвет',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/42169-lego-technic-neom-mclaren-formula-e?id=80634900',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (this.campaignUrlProp === 'https://220.lv' && this.language === 'RU') {
      this.collectablesLinks = [
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/maza-sadzives-tehnika-virtuvei/taukvares-katli/xiaomi-smart-air-fryer-pro-4l-eu?id=20864682',
          title: 'Аэрофритюрница Xiaomi Smart Air Fryer Pro EU Power 1600 W',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/saimniecibai/puteklu-suceji-roboti/robots-puteklu-sucejs-xiaomi-x10-plus?id=21405222',
          title:
            'Робот-пылесос Xiaomi X10 Plus., С функцией влажной уборки, Автоматическая очистка',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/saimniecibai/puteklu-suceji-slotas/puteklu-sucejs-slota-dyson-v15s-detect-submarine?id=25668761',
          title: 'Пылесос - метла Dyson V15s Detect Submarine',
        },
        {
          url: 'https://220.lv/lv/plansetdatori/plansetdatori/plansetdators-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=25947901',
          title: 'Планшет Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://220.lv/lv/mobilie-telefoni/telefons-xiaomi-redmi-note-13-pro-8256gb-midnight?id=27212893',
          title: 'Телефон Xiaomi Redmi Note 13 Pro 8GB|256GB Midnight Black',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/televizori-un-piederumi/televizori/televizors-samsung-qe43q60dauxxh?id=35298202',
          title: 'Samsung QE43Q60DAUXXH, 43" (~109 см)',
        },
        {
          url: 'https://220.lv/lv/datortehnika/monitori/monitors-lg-gaming-monitor-27gp850p-b-27-ips?id=11260130',
          title: "Монитор LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://220.lv/lv/datortehnika/spelu-konsoles/spelu-konsoles/spelu-konsole-playstation-5-slim-disc?id=26085716',
          title: 'Игровая приставка Playstation 5 Slim Disc',
        },
        {
          url: 'https://220.lv/lv/datortehnika/datoru-aksesuari/austinas/austinas-apple-airpods-2nd-generation-mv7n2zma?id=6590675',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/skaistumam/zobu-birstes/oral-b-io6-series-black-onyx?id=12981066',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/bernu-rati-un-aksesuari/bernu-rati/universalie-rati-kinderkraft-moov-2-air-3in1?id=31968452',
          title: 'Универсальная коляска Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/liela-sadzives-tehnika-virtuvei/mikrovilnu-krasnis/beko-moc20100bfb?id=19270477',
          title: 'Микроволновая печь Beko MOC20100BFB',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/virtuala-majdzivnieka-hologramma-spin-master-bitzee-magicals?id=40421182',
          title: 'Виртуальный питомец-голограмма Spin Master Bitzee Magicals',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/42156-lego-technic-peugeot-9x8-24h-le?id=22248687',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Гибридный гиперкар',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/skaistumam/matu-ieveidotaji/dyson-airstrait-ht01?id=28405436',
          title: 'Утюжок для волос Dyson Airstrait HT01',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-meitenem/mattel-barbijas-masina?id=17889757',
          title: 'Mattel - Barbie Dream Dreamcamper Vehicle',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/rotalu-sautene-nerf-elite-20-shockwave-rd?id=8363554',
          title: 'Игрушечный пистолет Nerf Elite 2.0 Shockwave RD-15, синий',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-meitenem/lellu-majina-mattel-hrj77?id=37724807',
          title: 'Кукольный домик Mattel HRJ77',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/sampuni/matu-kopsanas-lidzeklu-komplekts-tigi-bed-head?id=3331911',
          title:
            'Набор для ухода за волосами Tigi Bed Head Resurrection: шампунь 750 мл + бальзам 750 мл',
        },
        {
          url: 'https://220.lv/lv/smarzas/viriesu_smarzas/tualetes-udens-armaf-club-de-nuit-intense?id=6799130',
          title: 'Туалетная вода Armaf Club de Nuit Intense EDT для мужчин 105 мл',
        },
        {
          url: 'https://220.lv/lv/mobilie-telefoni-plansetdatori-foto/viedpulksteni-un-viedas-aproces/viedas-aproces-fitness-tracker/fitnesa-aproce-huawei-watch-fit-2-active-midnight-black?id=17189167',
          title: 'Смарт-браслет Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/matu-uzlabosanai/maska-molekularai-matu-atjaunosanai-k18-50-ml?id=14370327',
          title:
            'Несмываемая маска для молекулярного восстановления волос K18 Peptide™ Mask, 50 мл',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/10311-lego-icons-orhideja?id=14645193',
          title: '10311 LEGO® Icons Орхидея',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/sejas-kopsana/kremi/sejas-kopsanas-komplekts-lumene-lumo-berry-smooth?id=37684132',
          title:
            'Набор для ухода за лицом Lumene Lumo Berry Smooth: Vegan Collagen эссенция, 30 мл + дневной крем, 50 мл',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/matu-uzlabosanai/leave-in-molecular-repair-hair-mask-hair?id=20838427',
          title: 'Восстанавливающая маска для волос K18 Professional Molecular Repair, 150 мл',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/skaistumam/matu-ieveidotaji/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=40343212',
          title:
            'Набор для ухода за волосами Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://220.lv/lv/apgerbi-apavi-aksesuari/sieviesu-apgerbs/sieviesu-meteli/icepeak-sieviesu-ziemas-metelis-pittsfield-melns?id=30123861',
          title: 'Женское зимнее пальто Icepeak ADDIA, черный цвет',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/radio-vadama-automasina-monster-jam?id=39204312',
          title: 'Радиоуправляемая машина Monster Jam',
        },
        {
          url: 'https://220.lv/lv/zoo-preces/kakiem/nagu-asinamie-kakiem/nagu-asinamais-kakiem-villa-delux-tumsi-peleks?id=10602860',
          title: 'Когтеточка для кошек Villa Delux, темно-серый цвет',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/42169-lego-technic-neom-mclaren-formula-e?id=28017941',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (
      (this.campaignUrlProp === 'https://kaup.ee' ||
        this.campaignUrlProp === 'https://kaup24.ee') &&
      this.language === 'RU'
    ) {
      this.collectablesLinks = [
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/vaike-koogitehnika/frituurid-kuumaohufrituurid/frituurid-xiaomi-smart-air-fryer-pro-4l-eu?id=15817294',
          title: 'Аэрофритюрница Xiaomi Smart Air Fryer Pro EU Power 1600 W',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/kodumasinad/robottolmuimejad/robottolmuimeja-xiaomi-x10-plus?id=16606294',
          title:
            'Робот-пылесос Xiaomi X10 Plus., С функцией влажной уборки, Автоматическая очистка',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/kodumasinad/varstolmuimejad/varstolmuimeja-dyson-v15s-detect-submarine?id=20120353',
          title: 'Пылесос - метла Dyson V15s Detect Submarine',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/tahvelarvutid-e-lugerid/tahvelarvutid/tahvelarvuti-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=20418318',
          title: 'Планшет Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://kaup24.ee/et/mobiiltelefonid-foto--videokaamerad/mobiiltelefonid-ja-aksessuaarid/mobiiltelefonid/telefon-xiaomi-redmi-note-13-pro-8256gb-midnight?id=21538358',
          title: 'Телефон Xiaomi Redmi Note 13 Pro 8GB|256GB Midnight Black',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/telerid-ja-tarvikud/telerid/televiisor-samsung-qe43q60dauxxh?id=30279618',
          title: 'Телевизор Samsung QE43Q60DAUXXH, 43" (~109 см)',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/monitorid/monitorid/monitor-lg-gaming-monitor-27gp850p-b-27-ips?id=7362479',
          title: "Монитор LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/mangukonsoolid-ja-tarvikud/mangukonsoolid/mangukonsool-playstation-5-slim-disc?id=20522263',
          title: 'Игровая приставка Playstation 5 Slim Disc',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/korvaklapid/apple-airpods-2nd-generation-mv7n2zma?id=2567659',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/elektrilised-hambaharjad/oral-b-io6-series-black-onyx?id=9184963',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lapsevankrid/lapsevankrid-jalutuskarud/universaalne-vanker-kinderkraft-moov-2-air-3in1?id=26474873',
          title: 'Универсальная коляска Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/koogitehnika/mikrolaine--ja-konvektsioonahjud/beko-moc20100bfb?id=14074396',
          title: 'Beko MOC20100BFB',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/virtuaalne-lemmiklooma-hologramm-spin-master-bitzee-magicals?id=35430029',
          title: 'Виртуальный питомец-голограмма Spin Master Bitzee Magicals',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/42156-lego-technic-peugeot-9x8-24h-le?id=17284299',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Гибридный гиперкар',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/juuksesirgendajad-ja-koolutajad/dyson-airstrait-ht01?id=22620523',
          title: 'Утюжок для волос Dyson Airstrait HT01',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/manguasjad-tudrukutele/mattel-barbie-dream-dreamcamper-vehicle?id=13275386',
          title: 'Mattel - Barbie Dream Dreamcamper Vehicle',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/mangupustol-nerf-elite-20-shockwave-rd-15?id=4454081',
          title: 'Игрушечный пистолет Nerf Elite 2.0 Shockwave RD-15, синий',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/manguasjad-tudrukutele/nukumaja-mattel-hrj77?id=40609719',
          title: 'Кукольный домик Mattel HRJ77',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/sampoonid/sampoonid-juuksehoolduskomplekt-tugevalt-kahjustatud-juustele-tigi-bed-head?id=548356',
          title:
            'Набор для ухода за волосами Tigi Bed Head Resurrection: шампунь 750 мл + бальзам 750 мл',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/parfuumid-ja-lohnad/meeste-lohnad/meeste-lohnad-ja-parfuumid-tualettvesi-armaf-club-de-nuit-intense-edt?id=2250640',
          title: 'Туалетная вода Armaf Club de Nuit Intense EDT для мужчин 105 мл',
        },
        {
          url: 'https://kaup24.ee/et/mobiiltelefonid-foto-videokaamerad/nutikellad-ja-nutivorud/nutivorud-fitness-tracker/nutivoru-huawei-watch-fit-2-active-midnight-black?id=11220198',
          title: 'Смарт-браслет Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/juuste-tugevdamiseks/mask-juuste-molekulaarseks-taastamiseks-k18-50-ml?id=10583221',
          title:
            'Несмываемая маска для молекулярного восстановления волос K18 Peptide™ Mask, 50 мл',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/10311-lego-icons-orhidee?id=10849725',
          title: '10311 LEGO® Icons Орхидея',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/naohooldus/naokreemid/naohoolduskomplekt-lumene-lumo-berry-smooth-vegan-kollageeni?id=32703578',
          title:
            'Набор для ухода за лицом Lumene Lumo Berry Smooth: Vegan Collagen эссенция, 30 мл + дневной крем, 50 мл',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/juuste-tugevdamiseks/taastav-juuksemask-k18-professional-molecular-repair-150?id=16621644',
          title: 'Восстанавливающая маска для волос K18 Professional Molecular Repair, 150 мл',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/juuksesirgendajad-ja-koolutajad/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=35477029',
          title:
            'Набор для ухода за волосами Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://kaup24.ee/et/jalanud-riided-ja-aksessuaarid/naiste-riided/naiste-mantlid/icepeak-naiste-talvemantel-pittsfield-must?id=24197928',
          title: 'Женское зимнее пальто Icepeak ADDIA, черный цвет',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/raadio-teel-juhitav-auto-monster-jam?id=34370564',
          title: 'Радиоуправляемая машина Monster Jam',
        },
        {
          url: 'https://kaup24.ee/et/lemmikloomatarbed/kassid/kraapimispuud/kassi-ronimispuu-villa-delux-tumehall?id=6631864',
          title: 'Когтеточка для кошек Villa Delux, темно-серый цвет',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/42169-lego-technic-neom-mclaren-formula-e?id=22231288',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (this.campaignUrlProp === 'https://pigu.lt') {
      this.collectablesLinks = [
        {
          url: 'https://pigu.lt/lt/buitine-technika-elektronika/virtuves-iranga/gruzdintuves/xiaomi-smart-air-fryer-pro-4l-eu?id=68496581',
          title: 'Karšto oro gruzdintuvė Xiaomi Smart Air Fryer Pro 4L EU',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/namu-technika/dulkiu-siurbliai-robotai/dulkiu-siurblys-robotas-xiaomi-x10-plus?id=69698901',
          title:
            'Dulkių siurblys-robotas Xiaomi X10 Plus, Su plovimo funkcija, Automatinis išsivalymas',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/namu-technika/dulkiu-siurbliai-sluotos/dulkiu-siurblys-sluota-dyson-v15s-detect-submarine?id=77534559',
          title: 'Dulkių siurblys - šluota Dyson V15s Detect Submarine',
        },
        {
          url: 'https://pigu.lt/lt/plansetiniai-kompiuteriai/plansetes-tablets/plansetinis-kompiuteris-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=78014478',
          title:
            'Planšetinis kompiuteris Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://pigu.lt/lt/mobilieji-telefonai/telefonas-xiaomi-redmi-note-13-pro-8256gb-midnight?id=79358438',
          title: 'Telefonas Xiaomi Redmi Note 13 Pro 8/256GB Midnight Black',
        },
        {
          url: 'https://pigu.lt/lt/televizoriai/televizorius-samsung-qe43q60dauxxh?id=81244960',
          title: 'Televizorius Samsung QE43Q60DAUXXH, 43" (~109 cm)',
        },
        {
          url: 'https://pigu.lt/lt/monitoriai/monitorius-lg-gaming-monitor-27gp850p-b-27-ips?id=41176278',
          title:
            "Monitorius LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://pigu.lt/lt/zaidimu-konsoles-kompiuteriai-xbox-sony-playstation-nintendo/zaidimu-konsole-playstation-5-slim-disc?id=78321443',
          title: 'Žaidimų konsolė Playstation 5 Slim Disc',
        },
        {
          url: 'https://pigu.lt/lt/kompiuterine-technika/kompiuteriu-komponentai-ir-kt/ausines-mikrofonai/apple-airpods-2nd-generation-mv7n2zma?id=26378705',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/dantu-sepeteliai/dantu-sepetelis-oral-b-io6-series-black-onyx?id=47550772',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://pigu.lt/lt/vezimeliai/universalus-vezimelis-kinderkraft-moov-2-air-3in1?id=85853785',
          title: 'Universalus vežimėlis Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-elektronika/mikrobangu-krosneles/beko-moc20100bfb?id=62600643',
          title: 'Beko MOC20100BFB',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/virtualus-augintinis-holograma-spin-master-bitzee-magicals?id=90440246',
          title: 'Virtualus augintinis holograma Spin Master Bitzee Magicals',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/42156-lego-technic-peugeot-9x8-24h-le?id=71302661',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Hybrid Hypercar',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/plaukams/plauku-tiesinimo-prietaisai/dyson-airstrait-ht01?id=81137400',
          title: 'Plaukų tiesinimo žnyplės Dyson Airstrait HT01',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-mergaitems/leles-barbie-automobilis-dream-dreamcamper?id=55744914',
          title: 'Lėlės Barbie automobilis Dream Dreamcamper',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/zaislinis-sautuvas-nerf-elite-20-shockwave-rd?id=34791654',
          title: 'Žaislinis šautuvas Nerf Elite 2.0 Shockwave RD-15, mėlynas',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-mergaitems/leliu-namas-mattel-hrj77?id=83925700',
          title: 'Lėlių namas Mattel HRJ77',
        },
        {
          url: 'https://pigu.lt/lt/grozis-ir-mada/kosmetika/plauku-prieziurai/sampunai/plauku-prieziuros-priemoniu-rinkinys-tigi-bed-head?id=5251150',
          title:
            'Plaukų priežiūros priemonių rinkinys Tigi Bed Head Resurrection: šampūnas 750 ml + balzamas 750 ml',
        },
        {
          url: 'https://pigu.lt/lt/kvepalai-pigiau/kvepalai-vyrams/tualetinis-vanduo-armaf-club-de-nuit-intense?id=24160840',
          title: 'Tualetinis vanduo Armaf Club de Nuit Intense EDT vyrams 105 ml',
        },
        {
          url: 'https://pigu.lt/lt/mobilieji-telefonai-foto-ir-video/ismanieji-laikrodziai-ir-ismaniosios-apyrankes/ismaniosios-apyrankes-fitness-tracker/ismanioji-apyranke-huawei-watch-fit-2-active-midnight-black?id=55413289',
          title: 'Išmanioji apyrankė Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://pigu.lt/lt/priemones-nuo-plauku-slinkimo-stiprinimui/kauke-molekuliniam-plauku-atstatymui-k18-50-ml?id=49066209',
          title: 'Kaukė molekuliniam plaukų atstatymui K18, 50 ml',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/10311-lego-icons-orchideja?id=54051889',
          title: '10311 LEGO® Icons Orchidėja',
        },
        {
          url: 'https://pigu.lt/lt/kremai/veido-prieziuros-rinkinys-lumene-lumo-berry-smooth?id=95759268',
          title:
            'Veido priežiūros rinkinys Lumene Lumo Berry Smooth: Vegan Collagen esencija, 30 ml + dieninis kremas, 50 ml',
        },
        {
          url: 'https://pigu.lt/lt/priemones-nuo-plauku-slinkimo-stiprinimui/atkuriamoji-plauku-kauke-k18-professional-molecular-repair?id=49066214',
          title: 'Atkuriamoji plaukų kaukė K18 Professional Molecular Repair, 150 ml',
        },
        {
          url: 'https://pigu.lt/lt/buitine-technika-ir-elektronika/smulki-technika/plaukams/plauku-tiesinimo-prietaisai/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=91906390',
          title:
            'Plaukų priežiūros rinkinys Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://pigu.lt/lt/paltai-moterims/icepeak-moteriskas-zieminis-paltas-pittsfield-juodas?id=85334865',
          title: 'Icepeak moteriškas žieminis paltas PITTSFIELD, juodas',
        },
        {
          url: 'https://pigu.lt/lt/vaikams-ir-kudikiams/zaislai-ir-zaidimai-vaikams/zaislai-berniukams/radijo-bangomis-valdomas-automobilis-monster-jam?id=94313763',
          title: 'Radijo bangomis valdomas automobilis Monster Jam',
        },
        {
          url: 'https://pigu.lt/lt/gyvunu-prekes/katems/draskykles/draskykle-katems-villa-delux-tamsiai-pilka-140?id=42602753',
          title: 'Draskyklė katėms Villa Delux, tamsiai pilka, 140 cm',
        },
        {
          url: 'https://pigu.lt/lt/kudikiams-ir-vaikams/zaislai/konstruktoriai-ir-kaladeles/42169-lego-technic-neom-mclaren-formula-e?id=80634900',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (this.campaignUrlProp === 'https://220.lv') {
      this.collectablesLinks = [
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/maza-sadzives-tehnika-virtuvei/taukvares-katli/xiaomi-smart-air-fryer-pro-4l-eu?id=20864682',
          title: 'Aerogrils Xiaomi Smart Air Fryer Pro 4L EU',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/saimniecibai/puteklu-suceji-roboti/robots-puteklu-sucejs-xiaomi-x10-plus?id=21405222',
          title:
            'Robots putekļu sūcējs Xiaomi X10 Plus, Ar mazgāšanas funkciju, Automātiskā tīrīšana',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/saimniecibai/puteklu-suceji-slotas/puteklu-sucejs-slota-dyson-v15s-detect-submarine?id=25668761',
          title: 'Putekļu sūcējs - slota Dyson V15s Detect Submarine',
        },
        {
          url: 'https://220.lv/lv/plansetdatori/plansetdatori/plansetdators-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=25947901',
          title: 'Planšetdators Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://220.lv/lv/mobilie-telefoni/telefons-xiaomi-redmi-note-13-pro-8256gb-midnight?id=27212893',
          title: 'Telefons Xiaomi Redmi Note 13 Pro 8/256GB Midnight Black',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/televizori-un-piederumi/televizori/televizors-samsung-qe43q60dauxxh?id=35298202',
          title: 'Samsung QE43Q60DAUXXH, 43" (~109 cm)',
        },
        {
          url: 'https://220.lv/lv/datortehnika/monitori/monitors-lg-gaming-monitor-27gp850p-b-27-ips?id=11260130',
          title:
            "Monitors LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://220.lv/lv/datortehnika/spelu-konsoles/spelu-konsoles/spelu-konsole-playstation-5-slim-disc?id=26085716',
          title: 'Spēļu konsole Playstation 5 Slim Disc',
        },
        {
          url: 'https://220.lv/lv/datortehnika/datoru-aksesuari/austinas/austinas-apple-airpods-2nd-generation-mv7n2zma?id=6590675',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/skaistumam/zobu-birstes/oral-b-io6-series-black-onyx?id=12981066',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/bernu-rati-un-aksesuari/bernu-rati/universalie-rati-kinderkraft-moov-2-air-3in1?id=31968452',
          title: 'Universālie rati Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://220.lv/lv/tv-un-sadzives-tehnika/liela-sadzives-tehnika-virtuvei/mikrovilnu-krasnis/beko-moc20100bfb?id=19270477',
          title: 'Mikroviļņu krāsns Beko MOC20100BFB',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/virtuala-majdzivnieka-hologramma-spin-master-bitzee-magicals?id=40421182',
          title: 'Virtuālā mājdzīvnieka hologramma Spin Master Bitzee Magicals',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/42156-lego-technic-peugeot-9x8-24h-le?id=22248687',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Hybrid Hypercar',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/skaistumam/matu-ieveidotaji/dyson-airstrait-ht01?id=28405436',
          title: 'Matu taisnotājs Dyson Airstrait HT01',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-meitenem/mattel-barbijas-masina?id=17889757',
          title: 'Mattel - Bārbijas mašīna',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/rotalu-sautene-nerf-elite-20-shockwave-rd?id=8363554',
          title: 'Rotaļu šautene Nerf Elite 2.0 Shockwave RD-15',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-meitenem/lellu-majina-mattel-hrj77?id=37724807',
          title: 'Leļļu mājiņa Mattel HRJ77',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/sampuni/matu-kopsanas-lidzeklu-komplekts-tigi-bed-head?id=3331911',
          title:
            'Matu kopšanas līdzekļu komplekts Tigi Bed Head Resurrection: šampūns 750 ml + balzams 750 ml',
        },
        {
          url: 'https://220.lv/lv/smarzas/viriesu_smarzas/tualetes-udens-armaf-club-de-nuit-intense?id=6799130',
          title: 'Tualetes ūdens Armaf Club de Nuit Intense EDT vīriešiem 105 ml',
        },
        {
          url: 'https://220.lv/lv/mobilie-telefoni-plansetdatori-foto/viedpulksteni-un-viedas-aproces/viedas-aproces-fitness-tracker/fitnesa-aproce-huawei-watch-fit-2-active-midnight-black?id=17189167',
          title: 'Fitnesa aproce Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/matu-uzlabosanai/maska-molekularai-matu-atjaunosanai-k18-50-ml?id=14370327',
          title: 'Maska molekulārai matu atjaunošanai K18, 50 ml',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/10311-lego-icons-orhideja?id=14645193',
          title: '10311 LEGO® Icons Orhideja',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/sejas-kopsana/kremi/sejas-kopsanas-komplekts-lumene-lumo-berry-smooth?id=37684132',
          title:
            'Sejas kopšanas komplekts Lumene Lumo Berry Smooth: vegāniska kolagēna esence, 30 ml + dienas krēms, 50 ml',
        },
        {
          url: 'https://220.lv/lv/smarzas-kosmetika/matu-kopsanai/matu-uzlabosanai/leave-in-molecular-repair-hair-mask-hair?id=20838427',
          title: 'Leave-In Molecular Repair Hair Mask Hair Mask',
        },
        {
          url: 'https://220.lv/lv/sadzives-tehnika/skaistumam/matu-ieveidotaji/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=40343212',
          title:
            'Matu kopšanas komplekts Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://220.lv/lv/apgerbi-apavi-aksesuari/sieviesu-apgerbs/sieviesu-meteli/icepeak-sieviesu-ziemas-metelis-pittsfield-melns?id=30123861',
          title: 'Icepeak sieviešu ziemas mētelis PITTSFIELD, melns',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-zeniem-meitenem-zidainiem/rotallietas-zeniem/radio-vadama-automasina-monster-jam?id=39204312',
          title: 'Radio vadāma automašīna Monster Jam',
        },
        {
          url: 'https://220.lv/lv/zoo-preces/kakiem/nagu-asinamie-kakiem/nagu-asinamais-kakiem-villa-delux-tumsi-peleks?id=10602860',
          title: 'Nagu asināmais kaķiem Villa Delux, tumši pelēks, 140 cm',
        },
        {
          url: 'https://220.lv/lv/rotallietas-un-preces-berniem/rotallietas-un-speles/konstruktori/42169-lego-technic-neom-mclaren-formula-e?id=28017941',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (
      this.campaignUrlProp === 'https://kaup.ee' ||
      this.campaignUrlProp === 'https://kaup24.ee'
    ) {
      this.collectablesLinks = [
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/vaike-koogitehnika/frituurid-kuumaohufrituurid/frituurid-xiaomi-smart-air-fryer-pro-4l-eu?id=15817294',
          title: 'Kuumaõhufritüür Xiaomi Smart Air Fryer Pro 4L EU',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/kodumasinad/robottolmuimejad/robottolmuimeja-xiaomi-x10-plus?id=16606294',
          title: 'Robottolmuimeja Xiaomi X10 Plus, Märgpuhastus, Automaatne tühjendamine',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/kodumasinad/varstolmuimejad/varstolmuimeja-dyson-v15s-detect-submarine?id=20120353',
          title: 'Varstolmuimeja Dyson V15s Detect Submarine',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/tahvelarvutid-e-lugerid/tahvelarvutid/tahvelarvuti-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=20418318',
          title: 'Tahvelarvuti Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://kaup24.ee/et/mobiiltelefonid-foto--videokaamerad/mobiiltelefonid-ja-aksessuaarid/mobiiltelefonid/telefon-xiaomi-redmi-note-13-pro-8256gb-midnight?id=21538358',
          title: 'Telefon Xiaomi Redmi Note 13 Pro 8/256GB Midnight Black',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/telerid-ja-tarvikud/telerid/televiisor-samsung-qe43q60dauxxh?id=30279618',
          title: 'Televiisor Samsung QE43Q60DAUXXH, 43" (~109 cm)',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/monitorid/monitorid/monitor-lg-gaming-monitor-27gp850p-b-27-ips?id=7362479',
          title: "Monitor LG Gaming Monitor 27GP850P-B 27 \" IPS QHD 16:9 1 ms 400 cd/m², 27'' ~69",
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/mangukonsoolid-ja-tarvikud/mangukonsoolid/mangukonsool-playstation-5-slim-disc?id=20522263',
          title: 'Mängukonsool Playstation 5 Slim Disc',
        },
        {
          url: 'https://kaup24.ee/et/arvutid-ja-it-tehnika/korvaklapid/apple-airpods-2nd-generation-mv7n2zma?id=2567659',
          title: 'Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/elektrilised-hambaharjad/oral-b-io6-series-black-onyx?id=9184963',
          title: 'Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lapsevankrid/lapsevankrid-jalutuskarud/universaalne-vanker-kinderkraft-moov-2-air-3in1?id=26474873',
          title: 'Universaalne vanker Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/koogitehnika/mikrolaine--ja-konvektsioonahjud/beko-moc20100bfb?id=14074396',
          title: 'Beko MOC20100BFB',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/virtuaalne-lemmiklooma-hologramm-spin-master-bitzee-magicals?id=35430029',
          title: 'Virtuaalne lemmiklooma hologramm Spin Master Bitzee Magicals',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/42156-lego-technic-peugeot-9x8-24h-le?id=17284299',
          title: '42156 LEGO® Technic Peugeot 9X8 24H Le Mans Hybrid Hypercar',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/juuksesirgendajad-ja-koolutajad/dyson-airstrait-ht01?id=22620523',
          title: 'Sirgendaja Dyson Airstrait HT01',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/manguasjad-tudrukutele/mattel-barbie-dream-dreamcamper-vehicle?id=13275386',
          title: 'Mattel - Barbie Dream Dreamcamper Vehicle',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/mangupustol-nerf-elite-20-shockwave-rd-15?id=4454081',
          title: 'Mängupüstol Nerf Elite 2.0 Shockwave RD-15, sinine',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/manguasjad-tudrukutele/nukumaja-mattel-hrj77?id=40609719',
          title: 'Nukumaja Mattel HRJ77',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/sampoonid/sampoonid-juuksehoolduskomplekt-tugevalt-kahjustatud-juustele-tigi-bed-head?id=548356',
          title:
            'Juuksehoolduskomplekt tugevalt kahjustatud juustele Tigi Bed Head Resurrection, 2 x 750 ml',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/parfuumid-ja-lohnad/meeste-lohnad/meeste-lohnad-ja-parfuumid-tualettvesi-armaf-club-de-nuit-intense-edt?id=2250640',
          title: 'Tualettvesi Armaf Club de Nuit Intense EDT meestele, 105 ml',
        },
        {
          url: 'https://kaup24.ee/et/mobiiltelefonid-foto-videokaamerad/nutikellad-ja-nutivorud/nutivorud-fitness-tracker/nutivoru-huawei-watch-fit-2-active-midnight-black?id=11220198',
          title: 'Nutivõru Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/juuste-tugevdamiseks/mask-juuste-molekulaarseks-taastamiseks-k18-50-ml?id=10583221',
          title: 'Mask juuste molekulaarseks taastamiseks K18, 50 ml',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/10311-lego-icons-orhidee?id=10849725',
          title: '10311 LEGO® Icons Orhidee',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/naohooldus/naokreemid/naohoolduskomplekt-lumene-lumo-berry-smooth-vegan-kollageeni?id=32703578',
          title:
            'Näohoolduskomplekt Lumene Lumo Berry Smooth: Vegan kollageeni essents, 30 ml + päevakreem, 50 ml',
        },
        {
          url: 'https://kaup24.ee/et/kosmeetika-parfuumid/juuksehooldus/juuste-tugevdamiseks/taastav-juuksemask-k18-professional-molecular-repair-150?id=16621644',
          title: 'Taastav juuksemask K18 Professional Molecular Repair, 150 ml',
        },
        {
          url: 'https://kaup24.ee/et/kodumasinad-kodutehnika/ilu-tervis-ja-hugieen/juuksesirgendajad-ja-koolutajad/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=35477029',
          title:
            'Föön-koolutaja komplekt Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://kaup24.ee/et/jalanud-riided-ja-aksessuaarid/naiste-riided/naiste-mantlid/icepeak-naiste-talvemantel-pittsfield-must?id=24197928',
          title: 'Icepeak naiste talvemantel PITTSFIELD, must',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/manguasjad/poiste-manguasjad/raadio-teel-juhitav-auto-monster-jam?id=34370564',
          title: 'Raadio teel juhitav auto Monster Jam',
        },
        {
          url: 'https://kaup24.ee/et/lemmikloomatarbed/kassid/kraapimispuud/kassi-ronimispuu-villa-delux-tumehall?id=6631864',
          title: 'Kassi ronimispuu Villa Delux, tumehall',
        },
        {
          url: 'https://kaup24.ee/et/lapsed-ja-imikud/lastele-alates-3-aastat/kokkupandavad-manguasjad/42169-lego-technic-neom-mclaren-formula-e?id=22231288',
          title: '42169 LEGO® Technic NEOM McLaren Formula E Race Car',
        },
      ];
    } else if (this.campaignUrlProp === 'https://hobbyhall.fi') {
      this.collectablesLinks = [
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/keittion-pienkoneet/airfryerit-ja-friteerauskeittimet/xiaomi-smart-air-fryer-pro-4l-eu?id=4063996',
          title: 'Аэрофритюрница Xiaomi Smart Air Fryer Pro 4L EU',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/kodinkoneet/robotti-imurit/robotti-imuri-xiaomi-x10-plus?id=4423426',
          title:
            'Робот-пылесос Xiaomi X10 Plus, с функцией влажной уборки и автоматической очисткой',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/kodinkoneet/varsi-imurit/varsi-imuri-dyson-v15s-detect-submarine?id=11847148',
          title: 'Пылесос-метла Dyson V15s Detect Submarine',
        },
        {
          url: 'https://hobbyhall.fi/fi/tietokoneet-ja-pelaaminen/tabletit-ja-e-lukijat/tabletit/tabletti-samsung-galaxy-tab-a9-wifi-464gb-graphite?id=7599227',
          title: 'Планшет Samsung Galaxy Tab A9+ WiFi 4/64GB Graphite SM-X210NZAAEUE',
        },
        {
          url: 'https://hobbyhall.fi/fi/puhelimet-alylaitteet-ja-kamerat/matkapuhelimet-ja-tarvikkeet/matkapuhelimet/matkapuhelin-xiaomi-redmi-note-13-pro-8256gb-midnight?id=8122422',
          title: 'Смартфон Xiaomi Redmi Note 13 Pro 8/256GB Midnight Black',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/televisiot-ja-lisatarvikkeet/televisiot/televisio-samsung-qe43q60dauxxh?id=14981428',
          title: 'Телевизор Samsung QE43Q60DAUXXH, 43" (~109 см)',
        },
        {
          url: 'https://hobbyhall.fi/fi/tietokoneet-ja-pelaaminen/naytot-ja-kiinnikkeet/naytot/naytto-lg-gaming-monitor-27gp850p-b-27-ips?id=6843',
          title: 'Монитор LG Gaming Monitor 27GP850P-B 27" IPS QHD 16:9 1 мс 400 кд/м²',
        },
        {
          url: 'https://hobbyhall.fi/fi/tietokoneet-ja-pelaaminen/pelaaminen/pelikonsolit/pelikonsoli-playstation-5-slim-disc?id=7649852',
          title: 'Игровая приставка Playstation 5 Slim Disc',
        },
        {
          url: 'https://hobbyhall.fi/fi/tietokoneet-ja-pelaaminen/tietokoneen-lisalaitteet/kuulokkeet/apple-airpods-2nd-generation-mv7n2zma?id=183328',
          title: 'Наушники Apple AirPods (2nd generation) - MV7N2ZM/A',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/kauneudenhoitolaitteet/sahkohammasharjat/oral-b-io6-series-black-onyx?id=2562223',
          title: 'Электрическая зубная щетка Oral-B iO6 Series Black Onyx',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/vauvatarvikkeet/lastenvaunut-ja-rattaat/vaunut-ja-rattaat/universaali-lastenvaunu-kinderkraft-moov-2-air-3in1?id=11713458',
          title: 'Универсальная коляска Kinderkraft Moov 2 Air 3in1, Pure Black',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/keittiolaitteet/mikroaaltouunit/beko-moc20100bfb?id=4026361',
          title: 'Микроволновая печь Beko MOC20100BFB',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut/poikien-lelut/virtual-pet-hologram-spin-master-bitzee-magicals?id=20649793',
          title: 'Голографический питомец Spin Master Bitzee Magicals',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut-yli-3-vuotiaille-lapsille/legot-ja-rakennuslelut/42156-lego-technic-peugeot-9x8-24h-le?id=4337191',
          title: '42156 LEGO® Technic PEUGEOT 9X8 24H Le Mans Гибридный гиперкар',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/kauneudenhoitolaitteet/suoristusraudat-ja-kihartimet/dyson-airstrait-ht01?id=15230603',
          title: 'Выпрямитель для волос Dyson Airstrait HT01',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut/tyttojen-lelut/mattel-barbie-dream-dreamcamper-vehicle?id=3872711',
          title: 'Mattel - Barbie Dream Dreamcamper Vehicle',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut/poikien-lelut/leluase-nerf-elite-20-shockwave-rd-15?id=1275248',
          title: 'Игрушечный пистолет Nerf Elite 2.0 Shockwave RD-15',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut/tyttojen-lelut/nukkekoti-mattel-hrj77?id=26832933',
          title: 'Кукольный домик Mattel HRJ77',
        },
        {
          url: 'https://hobbyhall.fi/fi/hajuvedet-ja-kosmetiikka/hiustenhoitotuotteet/shampoot/hiustenhoitosetti-vakavasti-vaurioituneille-hiuksille-tigi-bed-head?id=27678',
          title:
            'Набор для ухода за волосами Tigi Bed Head Resurrection: шампунь 750 мл + бальзам 750 мл',
        },
        {
          url: 'https://hobbyhall.fi/fi/hajuvedet-ja-kosmetiikka/hajuvedet-ja-tuoksut/miesten-hajuvedet/hajuvesi-armaf-club-de-nuit-intense-edt?id=360193',
          title: 'Туалетная вода Armaf Club de Nuit Intense EDT для мужчин 105 мл',
        },
        {
          url: 'https://hobbyhall.fi/fi/puhelimet-alylaitteet-ja-kamerat/alykellot-ja-aktiivisuusrannekkeet/aktiivisuusrannekkeet/aktiiivisuusranneke-huawei-watch-fit-2-active-midnight-black?id=2995568',
          title: 'Смарт-браслет Huawei Watch Fit 2 Active Midnight Black',
        },
        {
          url: 'https://hobbyhall.fi/fi/hajuvedet-ja-kosmetiikka/hiustenhoitotuotteet/naamiot-oljyt-ja-seerumit/hiusnaamio-k18-50-ml?id=2981373',
          title: 'Маска для волос K18, 50 мл',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut-yli-3-vuotiaille-lapsille/legot-ja-rakennuslelut/10311-lego-icons-orkidea?id=3034303',
          title: '10311 LEGO® Icons Орхидея',
        },
        {
          url: 'https://hobbyhall.fi/fi/hajuvedet-ja-kosmetiikka/kasvojenhoitotuotteet/kasvovoiteet/kasvojenhoitosetti-lumene-lumo-berry-smooth-vegaani-kollageeni?id=17750128',
          title:
            'Набор для ухода за лицом Lumene Lumo Berry Smooth: Vegan Collagen эссенция, 30 мл + дневной крем, 50 мл',
        },
        {
          url: 'https://hobbyhall.fi/fi/hajuvedet-ja-kosmetiikka/hiustenhoitotuotteet/naamiot-oljyt-ja-seerumit/korjaava-hiusnaamio-k18-professional-molecular-repair-150?id=4018861',
          title: 'Восстанавливающая маска для волос K18 Professional Molecular Repair, 150 мл',
        },
        {
          url: 'https://hobbyhall.fi/fi/kodinkoneet-ja-kodinelektroniikka/kauneudenhoitolaitteet/suoristusraudat-ja-kihartimet/dyson-airwrap-hs05-complete-long-prussian-bluerich?id=20680323',
          title:
            'Устройство для укладки волос Dyson Airwrap HS05 Complete Long Prussian Blue/Rich Copper',
        },
        {
          url: 'https://hobbyhall.fi/fi/muoti/naisille/naisten-vaatteet/naisten-takit/icepeak-naisten-talvitakki-pittsfield-musta?id=10010963',
          title: 'Женская зимняя куртка Icepeak PITTSFIELD, черная',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut/poikien-lelut/radio-ohjattava-auto-monster-jam?id=19569498',
          title: 'Радиоуправляемая машина Monster Jam',
        },
        {
          url: 'https://hobbyhall.fi/fi/lemmikit/kissat/raapimispuut-ja-kiipeilypuut/raapimispuu-villa-delux-tummanharmaa-140-cm?id=1944738',
          title: 'Когтеточка Villa Delux, темно-серый, 140 см',
        },
        {
          url: 'https://hobbyhall.fi/fi/lapset/lelut-yli-3-vuotiaille-lapsille/legot-ja-rakennuslelut/42169-lego-technic-neom-mclaren-formula-e?id=8599922',
          title: '42169 LEGO® Technic NEOM McLaren Formula E гоночный автомобиль',
        },
      ];
    } else {
      this.collectablesLinks = [
        'https://www.pegasas.lt/noriu-valgyti-sveikai-bet-skaniai-1114698',
        'https://www.pegasas.lt/liepsnojantis-kryzius-ciklo-svetimsale-5-knyga-1113987',
        'https://www.pegasas.lt/sviesos-stygius-1114152',
        'https://www.pegasas.lt/gliukozes-revoliucija-1114104',
        'https://www.pegasas.lt/wrendale-kaulinio-porceliano-puodelis-su-padekliuku-oh-christmas-tree-5994082',
        'https://www.pegasas.lt/kaledos-ateina-1114320',
        'https://www.pegasas.lt/manifestavimas-1114435',
        'https://www.pegasas.lt/nesiojama-zaidimu-konsole-my-arcade-go-gamer-tetris-301-zaidimas-viename-530631',
        'https://www.pegasas.lt/namu-kvapas-the-olphactory-white-musk-250-ml-5338027',
        'https://www.pegasas.lt/haris-poteris-kaledos-hogvartse-paveiksleliu-knyga-1114472',
        'https://www.pegasas.lt/lego-city-miesto-centro-tramvajus-ir-stotele-60423-5704456',
        'https://www.pegasas.lt/sunyciai-patruliai-advento-kalendorius-1114538',
      ];
    }
    this.isMobile = window.innerWidth <= 1280;
    this.containerDiv = null;
    this.render();
  }

  // Update properties method
  updateProps(prop) {
    this.prop = prop;

    if (this.prop === 'Pigu.lt') {
      this.collectables = [
        item1pegasas,
        item2pegasas,
        item3pegasas,
        item4pegasas,
        item5pegasas,
        item6pegasas,
        item7pegasas,
        item8pegasas,
        item9pegasas,
        item10pegasas,
        item11pegasas,
        item12pegasas,
      ];
    } else if (this.prop && this.prop.includes('Plastic')) {
      // Handle Gamtos Ateitis collectables
      this.collectables = [
        item16,
        item4,
        item14,
        item1,
        item23,
        item20,
        item10,
        item8,
        item6,
        item12,
        item19,
        item7,
      ];
    } else if (this.prop && this.prop.includes('Paper')) {
      // Handle Paper collectables
      this.collectables = [
        item16Paper,
        item4Paper,
        item14Paper,
        item1Paper,
        item23Paper,
        item20Paper,
        item10Paper,
        item8Paper,
        item6Paper,
        item12Paper,
        item19Paper,
        item7Paper,
      ];
    } else if (this.prop && this.prop.includes('Glass')) {
      // Handle Glass collectables
      this.collectables = [
        item16Glass,
        item4Glass,
        item14Glass,
        item1Glass,
        item23Glass,
        item20Glass,
        item10Glass,
        item8Glass,
        item6Glass,
        item12Glass,
        item19Glass,
        item7Glass,
      ];
    } else if (this.prop === 'Pieno Žvaigždės') {
      // Handle Glass collectables
      this.collectables = [
        item15PienoZvaigzdes,
        item1PienoZvaigzdes,
        item8PienoZvaigzdes,
        item2PienoZvaigzdes,
        item7PienoZvaigzdes,
        item5PienoZvaigzdes,
      ];
    } else if (this.prop === 'Pegasas') {
      // Handle Glass collectables
      this.collectables = [
        item1pegasas,
        item2pegasas,
        item3pegasas,
        item4pegasas,
        item5pegasas,
        item6pegasas,
        item7pegasas,
        item8pegasas,
        item9pegasas,
        item10pegasas,
        item11pegasas,
        item12pegasas,
      ];
    }

    this.updateVisuals();
  }

  updateVisuals() {
    this.config = localStorageService.getDefaultConfig();
    this.language = this.config.language ? this.config.language : 'LV';
    const currentPageUrl = window.location.href;
    const urlParams = new URL(currentPageUrl).searchParams;
    const campaignUrl = urlParams.get('campaign_url');

    this.campaignUrlProp = campaignUrl ? campaignUrl : currentPageUrl;
    if (!this.containerDiv) return;

    const currentDate = new Date();
    const startDate = new Date('2024-11-26'); // Set the start date as November 26, 2024
    const dayDiff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate days since start date

    // Determine the day index (0 for the first day, 1 for the second, 2 for the third, and then repeat)
    const dayIndex = dayDiff % 3; // This will give 0, 1, or 2, and repeat every 3 days

    // Determine which part of collectables to show based on the day index
    const startIndex = dayIndex * 9;
    const endIndex = startIndex + 9;

    // Slice the collectables array to get the correct range for the current day
    const dailyCollectables = this.collectables.slice(startIndex, endIndex);
    const dailyLinks = this.collectablesLinks.slice(startIndex, endIndex);

    // Create the table HTML for the selected collectables
    let tableHTML = '';

    const loopingImages = this.prop === 'Pigu.lt' ? dailyCollectables : this.collectables;
    loopingImages?.forEach((item, index) => {
      const globalIndex = startIndex + index; // Get the global index for links
      const link = dailyLinks[index];

      if (index % 3 === 0) {
        tableHTML += '<tr style="border-spacing:2px;border-collapse:separate">';
      }

      tableHTML += `
        <td style="padding:5px;text-align: center; border: none; ${
          this.prop === 'Pegasas' || this.prop === 'Pigu.lt' ? 'cursor:pointer' : ''
        }">
        <div id="image-${this.prop === 'Pigu.lt' ? globalIndex : index}" style="max-width:170px;">
        <img class='image-container' style='opacity:1;width:${
          this.prop === 'Pieno Žvaigždės'
            ? '70px'
            : this.prop === 'Pieno Žvaigždės'
            ? '100px'
            : '60px'
        };height:${
        this.prop === 'Pieno Žvaigždės'
          ? '70px'
          : this.prop === 'Pieno Žvaigždės'
          ? '100px'
          : '60px'
      }' src=${item} alt="Scoreboard Image" >
      ${
        (this.prop === 'Pegasas' && this.collectablesLinks[index]) ||
        (this.prop === 'Pigu.lt' && link)
          ? `<div class='image-container-text'><a href="${
              this.prop === 'Pegasas'
                ? this.collectablesLinks[index]
                : this.prop === 'Pigu.lt' && link.url
            }" target="_blank" style="color: white; text-decoration: underline;"><p style="margin-left:10px;margin-right:10px;max-width:280px;line-height:10px;">${
              this.prop === 'Pegasas'
                ? this.collectablesLinks[index]
                : this.prop === 'Pigu.lt' && link.title
            }<p/></a></div>`
          : ''
      }
        </div>
        </td>`;

      if (
        (index + 1) % 3 === 0 || this.prop === 'Pigu.lt'
          ? index === dailyCollectables.length - 1
          : index === this.collectables.length - 1
      ) {
        tableHTML += '</tr>';
      }
    });

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;

    let scoreboardText = `
      ${`<div class="bomio-first-line" style="width:100%; top: ${'505px'};line-height:18px; position: absolute;font-weight: 700; text-align: center; color: white; font-size:${
        this.prop === 'Pegasas' || this.prop === 'Pieno Žvaigždės' ? '18px' : '12px'
      } ; font-family: Montserrat;  word-wrap: break-word">${
        this.prop.includes('Gamtos Ateitis')
          ? `Šių atliekų negalima mesti į
${
  this.prop === 'Gamtos Ateitis Paper'
    ? 'popieriui'
    : this.prop === 'Gamtos Ateitis Plastic'
    ? 'plastikui'
    : this.prop === 'Gamtos Ateitis Glass' && 'stiklui'
} skirtus konteinerius.`
          : this.prop === 'Pegasas'
          ? 'DAUGIAU PEGASO PRODUKTŲ RASI'
          : 'SU MIAU GYVENT SMAGIAU'
      }</div>
              <div class="bomio-second-line" style="width:100%; top: ${'525px'};line-height:18px; position: absolute; text-align: center; color: white; font-size:${'12px'} ; font-family: Montserrat; font-weight:${
        this.prop === 'Pieno Žvaigždės' ? 500 : 400
      };  word-wrap: break-word;text-decoration:${
        this.prop === 'Pieno Žvaigždės' ? 'underline' : ''
      } ">${
        this.prop === 'Pegasas'
          ? ''
          : this.prop === 'Pieno Žvaigždės'
          ? ''
          : 'Daugiau apie tinkamą  rūšiavimą sužinosi puslapyje'
      }${
        this.prop === 'Pieno Žvaigždės'
          ? `<a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="https://pienozvaigzdes.lt/lt/20_miau" 
  style="color:white">
  DAUGIAU MIAU!
</a> `
          : ''
      }
          ${
            this.prop === 'Pegasas' || this.prop === 'Pigu.lt'
              ? `<a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="https://www.pegasas.lt/" 
  style="color:white;font-size:16px;">
  Pegasas.lt
</a> `
              : ''
          }
          
      
      </div>
            <div style="width:100%; top: 546px; position: absolute; text-align: center; color: white; font-size: 14px; font-family: Montserrat; font-weight: 700;  word-wrap: break-word;text-decoration: underline;"><a 
  onclick="event.stopPropagation();" 
  target="_blank" 
  href="${
    this.prop === 'Pieno Žvaigždės'
      ? 'https://pienozvaigzdes.lt/lt/20_miau'
      : this.prop === 'Pegasas'
      ? 'https://www.pegasas.lt/'
      : 'https://gamtosateitis.lt/rusiavimo-abc'
  }" 
  style="color:white">
  ${
    this.prop === 'Pegasas'
      ? ''
      : this.prop === 'Pieno Žvaigždės'
      ? ''
      : 'https://gamtosateitis.lt/rusiavimo-abc/'
  }
</a> </div> `}
    `;

    if (this.prop !== 'Pigu.lt') {
      this.containerDiv.querySelector('.boomio-scoreboard-text').innerHTML = scoreboardText;
    }

    this.containerDiv.querySelector('.boomio-tbody').innerHTML = tableHTML;
    if (this.prop === 'Pegasas' || this.prop === 'Pigu.lt') {
      document.getElementById('boomio-close-did-you-know').addEventListener('click', () => {
        // Find all enlarged images by checking for the 'enlarge-image' class
        const enlargedImages = document.querySelectorAll('.enlarge-image');

        // Loop through each enlarged image and remove the 'enlarge-image' class
        enlargedImages.forEach((imgElement) => {
          imgElement.classList.remove('enlarge-image');

          // Also hide the text element associated with the image if it exists
          const textElement = imgElement.querySelector('.image-container-text');
          if (textElement) {
            textElement.style.display = 'none';
          }
        });
      });

      this.addfunc(); // Make sure to reapply any additional functions you need
    }
  }

  addfunc() {
    for (let index = 0; index < this.collectables?.length; index++) {
      const image = document.getElementById(`image-${index}`);
      if (image && window.getComputedStyle(image).backgroundColor !== 'rgb(255, 255, 255)') {
        image.addEventListener('click', () => {
          this.handleImageClick(image);
        });
      }
    }
  }

  handleImageClick(image) {
    // Toggle a class to make the image larger and centered
    image.classList.toggle('enlarge-image');
    const textElement = image.querySelector('.image-container-text');

    if (textElement) {
      // Toggle the visibility of the text when the image is enlarged
      textElement.style.display = textElement.style.display === 'block' ? 'none' : 'block';
    }

    if (this.prop === 'Pegasas') {
      document.querySelector('.bomio-first-line').style.display =
        textElement.style.display === 'block' ? 'none' : 'block';
      document.querySelector('.bomio-second-line').style.display =
        textElement.style.display === 'block' ? 'none' : 'block';
    }

    // Get the image element (the actual <img> inside the image div)
    const imgElement = image.querySelector('img');
    if (imgElement) {
      imgElement.classList.toggle('enlarge-image');
    }

    // Add event listener to close image when clicking anywhere on the screen
    const closeImageHandler = (event) => {
      const firstLine = document.querySelector('.bomio-first-line');
      const secondLine = document.querySelector('.bomio-second-line');
      if (firstLine) firstLine.style.display = 'block';
      if (secondLine) secondLine.style.display = 'block';
      // Check if the click is outside the image container (image or text)
      if (!image.contains(event.target)) {
        // Close the enlarged image by removing the 'enlarge-image' class

        if (imgElement) {
          imgElement.classList.remove('enlarge-image');
        }

        // Hide the text element if it exists
        if (textElement) {
          textElement.style.display = 'none';
        }

        // Remove the event listener after the image is closed to prevent memory leaks
        document.removeEventListener('click', closeImageHandler);
      }
    };
  }

  render() {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('did-you-know-container');
    containerDiv.setAttribute('id', 'did-you-know-container');
    containerDiv.style.background = 'none';
    // containerDiv.style.border = this.prop === 'Penki Sezonai' && '2px solid #A6CE39';

    containerDiv.style.width =
      document.body.offsetWidth < 426
        ? document.body.offsetWidth < 321
          ? '375px'
          : document.body.offsetWidth + 'px'
        : '426px';
    containerDiv.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative; ">
      <div style="width:calc(100% - 20px);margin-left:10px;top: 42px; position: absolute; text-align: center;line-height:42px; color: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; font-size: 36px; font-family: Georama; font-weight: 900; text-transform: uppercase; word-wrap: break-word" id="boomio-collection-scoreboard-name">${
      this.prop === 'Pigu.lt'
        ? 'HAVE YOU SEEN THE TOP DEALS?'
        : this.prop === 'Pieno Žvaigždės'
        ? 'Ar visus RAGAVAI?'
        : this.prop === 'Pegasas'
        ? 'ĮSIGYK PEGASO PERKAMIAUSIUS'
        : 'Ar žinojai?'
    }</div>
      
      <div class="boomio-scoreboard-text">
      `;

    containerDiv.innerHTML += `
              </div>
      <div  style="width:100%;height: ${'302px'}; top: ${
      this.prop === 'Pegasas' ? '150px' : this.prop === 'Pieno Žvaigždės' ? '174px' : '114px'
    }; position: absolute; border-right:none;">
        <div class="boomio-custom-scrollbar">
          <table style="margin-top:${
            this.prop === 'Pigu.lt' ? '60px' : '30px'
          };border-spacing:3px;width:calc(100% - 60px);margin-left:30px;border-collapse:separate">
            <tbody class="boomio-tbody">
    `;

    containerDiv.innerHTML += `
            </tbody>
          </table>
        </div>
          <div style="color:#DFFC38;width:100%;font-size:${
            this.isSmallMobile ? '7px' : this.isMobile ? '10px' : '12px'
          };text-align:center;text-transform:uppercase;top:550px;position:absolute;margin-top:2px;height: 22px; justify-content: center; align-items: center; display: flex;font-weight:600;background-size: contain;">
          <div style="display:${
            this.prop === 'Pigu.lt' ? 'block' : 'none'
          };border-radius:35px;width: calc(100% - 60px);margin-left:30px;margin-right:30px;top:585px;height: 28px; background: ${
      this.prop === 'Pigu.lt' ? 'black' : 'none'
    }; overflow: hidden; justify-content: center; align-items: center; gap: 11px; display: flex;font-family:Georama" id="boomio-game-link-to-web">
      ${
        this.prop === 'Pigu.lt'
          ? this.language === 'EN'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Discover the best Pigu.lt deals!</a>'
            : this.language === 'LV'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://220.lv">Atklāj labākos 220.lv piedāvājumus!</a>'
            : this.language === 'ET'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://kaup24.ee">Avasta Kaup24.ee parimaid ostudiile!</a>'
            : this.language === 'FI'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://hobbyhall.fi">Löydä parhaat diilit Hobbyhall.fi verkkokaupasta!</a>'
            : this.language === 'RU' &&
              (this.campaignUrlProp === 'https://kaup.ee' ||
                this.campaignUrlProp === 'https://kaup24.ee')
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://kaup24.ee">Открой для себя лучшие предложения Kaup24!</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://pigu.lt'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Открой для себя лучшие предложения Pigu.lt!</a>'
            : this.language === 'RU' && this.campaignUrlProp === 'https://220.lv'
            ? '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Открой для себя лучшие предложения 220.lv!</a>'
            : '<a style="text-decoration:none;color:white" target="_blank" href="https://pigu.lt">Atrask geriausius Pigu.lt pasiūlymus!</a>'
          : ''
      }
  </div>
      </div>
      <div style="width: calc(100% - 40px);margin-left:20px;margin-right:20px;top:595px;position:absolute; height: 38px; background: ${
        this.prop === 'Barbora' ||
        this.prop === 'Fpro' ||
        this.prop === 'Fantazijos' ||
        this.prop === 'LemonGym'
          ? 'white'
          : 'white'
      }; box-shadow: -4px -4px 8px #DFE6F5 inset; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: flex" id="boomio-close-did-you-know">
        <div style="text-align: center; color: ${'rgba(61, 73, 40, 1)'} ; font-size: 24px; font-family: Georama; font-weight: 700; line-height: 24px; word-wrap: break-word;cursor:pointer;">
        ${
          this.prop !== 'Pigu.lt'
            ? 'TOLIAU'
            : this.language === 'EN'
            ? 'NEXT'
            : this.language === 'LT'
            ? 'PIRMYN'
            : this.language === 'LV'
            ? 'KLIKŠĶINI'
            : this.language === 'ET'
            ? 'JÄRGMINE'
            : this.language === 'FI'
            ? 'SEURAAVA'
            : this.language === 'RU' && 'ДАЛЕЕ'
        }
        </div>
      </div>
    </div>`;
    this.containerDiv = containerDiv;

    const existingContainer = document.getElementById('did-you-know-container');
    if (existingContainer) {
      existingContainer.parentNode.replaceChild(containerDiv, existingContainer);
    } else {
      document.body.appendChild(containerDiv);
    }

    this.updateVisuals();
  }
}
