import './styles.css';
import { localStorageService } from '@/services';
import { uncheckIcon } from './constants';

// Helper function to get rules title based on language and customer
const getRulesTitle = (customer, language) => {
  if (customer === 'Eurovaistine') return 'NOTEIKUMI';
  if (customer === 'Ikea') return 'Kaip žaisti?';
  if (customer === 'SaludSA') return 'Reglas';
  if (language === 'LT') return 'TAISYKLĖS';
  if (language === 'LV') return 'NOTEIKUMI';
  if (language === 'RU') return 'ПРАВИЛА';
  if (language === 'ET') return 'MÄNGUREEGLID';
  if (language === 'ES') return 'REGLAS';
  if (language === 'FI') return 'Säännöt';
  if (language === 'EN') return 'RULES';
  return '';
};

// Helper function to get Rule 1 title based on customer, language, and game
const getRule1Title = (customer, language, game) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'Catch';
    if (language === 'LT') return 'Gaudyk';
    if (language === 'RU') return 'Лови';
    if (language === 'LV') return 'Noķer';
    if (language === 'ET') return 'Püüa';
    if (language === 'FI') return 'Kerää';
  }

  // Other customer-specific rules
  if (customer === 'Apranga' && language === 'LT') return 'SUDĖKITE';
  if (customer === 'Akropolis' && language === 'LV') return 'ĶER';
  if (customer === 'Akropolis' && language === 'RU') return 'Лови';

  // Game-specific rules for 'drive'
  if (game === 'drive') {
    if (language === 'EN') return 'Move';
    if (language === 'LV') return 'Stūrē';
    if (language === 'ET') return 'Navigeerimiseks';
    if (language === 'FI') return 'PYYHKÄISE';
    if (language === 'RU') return 'Двигайтесь';
    if (language === 'LT') return 'Judėk';
    if (language === 'ES') return 'Desplázate';
  }

  // Doodle game specific
  if (language === 'LV' && game === 'doodle') return 'PĀRVIETOJIES';
  if (customer === 'Eurovaistine') return 'SAŅEMT';

  // Catch game variations
  if (game === 'catch') {
    if (language === 'EN') return 'CATCH';
    if (language === 'ES') return 'ATRAPAR';
    return 'Gaudyk';
  }

  // More customer-specific rules
  if (customer === 'SaludSA') return 'Presiona';
  if (customer === 'Perlas GO') return 'Judėk';
  if (customer === 'Dentsu' && game === 'runner') return 'Judėk';
  if (customer.includes('Gamtos Ateitis') && game === 'catch') return 'Brauk';
  if (customer.includes('Gamtos Ateitis') && game === 'crush') return 'Sudėk';
  if (customer === 'LemonFeel') return 'KLIKŠĶINI,';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'Judėk';
      if (language === 'LV') return 'Kusties';
      if (language === 'ET') return 'Liigu';
    }
  }

  // Runner game
  if (game === 'runner') {
    if (language === 'LT') return 'Judėk';
    if (language === 'EN') return 'Move';
    if (language === 'ES') return 'Muévete';
  }

  // Language-specific defaults
  if (language === 'LV') return 'SPIED,';
  if (language === 'RU') return 'ПРАВИЛА';

  // Toni game-specific rules
  if (customer === 'Toni') {
    if (game === 'flappy') return 'Toca';
    if (game === 'doodle') return 'Muévete';
    return 'Desliza';
  }

  if (language === 'ET') return 'KLÕPSA';
  if (customer === 'Fpro') return 'CLICK';
  if (customer === 'Ikea') return 'Vairuokite,';
  if (customer === 'Nevezis') return 'Judėk';
  if (language === 'EN') return 'CLICK';
  if (customer === 'Nykstukas') return 'Judėk';
  if (game === 'doodle') return 'Judėk';

  // Crush game variations
  if (language === 'ES' && game === 'crush') return 'CONECTAR';
  if (game === 'crush') return 'Sudėk';
  if (game === 'drive') return 'Brauk';

  return 'Click,';
};

// Helper function to get Rule 1 descriptive text based on customer, language, and game
const getRule1Text = (customer, language, game) => {
  // Akropolis variations
  if (customer === 'Akropolis' && language === 'LV') return 'Narvesen kafijas krūzītes.';
  if (customer === 'Akropolis' && language === 'LT') return ',,Caif Cafe" kavos puodelius.';

  // Other specific customers
  if (customer === 'Daumantu') return ' TIK Daumantų produktus.';

  // Pigu.lt crush game variations by language
  if (customer === 'Pigu.lt' && game === 'crush') {
    if (language === 'EN') return '3 or more items together.';
    if (language === 'LV') return 'kopā 3 vai vairāk priekšmetus.';
    if (language === 'ET') return '3 või rohkem sarnast asja.';
    if (language === 'FI') return 'vähintään 3 samanlaista esinettä.';
    if (language === 'RU') return '3 или более предметов.';
    if (language === 'LT') return 'kartu 3 ar daugiau prekes.';
  }

  // Pigu.lt other games by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'the good items.';
    if (language === 'LT') return 'gerus daiktus.';
    if (language === 'RU') return 'хорошие предметы.';
    if (language === 'LV') return 'labās preces.';
    if (language === 'ET') return 'häid asju.';
    if (language === 'FI') return 'hyvät esineet.';
  }

  // More specific customers
  if (customer === 'Eurovaistine') return 'pārvietojoties uz sāniem.';
  if (customer === 'Apranga') return '3 ar daugiau vienodų prekių.';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'į šonus, kad nenukristum.';
      if (language === 'LV') return 'uz sāniem, lai nenokristu.';
      if (language === 'ET') return 'külgedele, et vältida kukkumist.';
    }
  }

  // Gamtos Ateitis variations
  if (customer === 'Gamtos Ateitis Paper' && game === 'catch') return 'popieriaus pakuočių atliekas.';
  if (customer === 'Gamtos Ateitis Plastic' && game === 'catch') return 'plastiko pakuočių atliekas.';
  if (customer === 'Gamtos Ateitis Glass' && game === 'catch') return 'stiklo pakuočių atliekas.';
  if (customer.includes('Gamtos Ateitis') && game === 'crush') return 'kartu 3 ar daugiau vienodų pakuočių.';

  // More specific customers
  if (customer === 'Pieno Žvaigždės') return '"MIAU" produktus.';
  if (customer === 'Pegasas') return ' Pegaso produktus.';

  // Toni variations by game
  if (customer === 'Toni') {
    if (game === 'catch') return 'la BiciTopsy.';
    if (game === 'crush') return 'y junta.';
    if (game === 'flappy') return 'para volar.';
    if (game === 'doodle') return 'con las flechas.';
  }

  // More specific customers
  if (customer === 'Fpro') return 'TO FLY';
  if (customer === 'SaludSA') return 'para volar';
  if (customer === 'Perlas GO') return 'į šonus, kad nenukristum.';
  if (customer === 'Dentsu' && game === 'flappy') return 'kad skristum.';
  if (customer === 'Nevezis') return 'į šonus, kad nenukristum.';
  if (customer === 'Nykstukas') return 'baksnodamas ekraną Nykštuką išlaikysi ore.';
  if (customer === 'Orlen' && game === 'catch') return 'ledus ir gauk taškus.';
  if (customer === 'Zemaitijos Pienas') {
    if (language === 'LV') return '3 vai vairāk vienādus priekšmetus.';
    if (language === 'ET') return '3 või rohkem ühesuguseid esemeid.';
  }

  // Drive game variations by language
  if (game === 'drive') {
    if (customer === 'Ikea') return 'braukdami kairiau ar dešiniau.';
    if (language === 'LT') return 'į šonus, kad vairuotum.';
    if (language === 'LV') return 'pa labi un pa kreisi';
    if (language === 'ET') return 'liigu paremale ja vasakule.';
    if (language === 'EN') return 'sideways to steer.';
    if (language === 'RU') return 'вправо и влево';
    if (language === 'ES') return 'lateralmente para esquivar los obstáculos.';
  }

  // Runner game
  if (game === 'runner') {
    if (language === 'LT') return 'rodyklių pagalba.';
    if (language === 'EN') return 'with the arrows.';
    if (language === 'ES') return 'con las flechas.';
  }

  // Doodle game
  if (game === 'doodle') return 'į šonus, kad nenukristum.';

  // Catch game by language
  if (game === 'catch') {
    if (language === 'EN') return 'to get points.';
    if (language === 'ES') return 'para obtener puntos.';
  }

  // Crush game by language
  if (game === 'crush') {
    if (language === 'ES') return "Tres o más helados 'Toni'";
    return 'kartu 3 ar daugiau prekes.';
  }

  // Language-specific defaults
  if (language === 'LV') return 'lai lidotu.';
  if (language === 'RU') return 'чтобы лететь';
  if (language === 'ET') return 'lendamiseks';
  if (language === 'EN') return 'TO FLY';

  // Final fallback
  return 'to fly.';
};

// Helper function to get Rule 2 title based on customer, language, and game
const getRule2Title = (customer, language, game) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'Avoid';
    if (language === 'LT') return 'Venk';
    if (language === 'RU') return 'Избегай';
    if (language === 'LV') return 'Izvairies';
    if (language === 'ET') return 'Väldi';
    if (language === 'FI') return 'Vältä';
  }

  if (customer === 'Pigu.lt') {
    if (language === 'EN') return 'Repeat ';
    if (language === 'LV') return 'Atkārto,';
    if (language === 'ET') return 'Korda,';
    if (language === 'FI') return 'Toista ,';
    if (language === 'RU') return 'Повтори  ';
    if (language === 'LT') return 'Kartok  ';
  }

  // Doodle game LV language
  if (language === 'LV' && game === 'doodle') return 'SPĒLĒ VĒLREIZ,';

  // Novaturas variations by language
  if (customer === 'Novaturas') {
    if (language === 'LT') return 'Rink  ';
    if (language === 'LV') return 'Savāc ';
    if (language === 'ET') return 'Kogu  ';
    if (language === 'EN') return 'Collect  ';
    if (language === 'RU') return 'Собирайте  ';
  }

  // Akropolis variations by language
  if (customer === 'Akropolis') {
    if (language === 'LV') return 'SPĒLĒ VĒLREIZ,';
    if (language === 'RU') return 'Играй снова,';
  }

  // Toni variations by game
  if (customer === 'Toni') {
    if (game === 'catch') return 'Atrapa';
    if (game === 'crush') return 'Combina';
    if (game === 'flappy') return 'Supera';
    if (game === 'doodle') return 'Sube';
    if (game === 'drive') return 'Atrapa';
    if (game === 'runner') return 'Repetir';
  }

  // Other customer-specific rules
  if (customer === 'Fpro') return 'REPEAT';
  if (customer === 'Ikea') return 'Kartokite,';
  if (customer === 'Eurovaistine') return 'ATKĀRTOT';
  if (customer === 'SaludSA') return 'Presiona';

  // Gamtos Ateitis variations by game
  if (customer.includes('Gamtos Ateitis')) {
    if (game === 'catch') return 'Rink';
    if (game === 'crush') return 'Siek';
  }

  // More customer-specific rules
  if (customer === 'Nykstukas') return 'Įveik';
  if (customer === 'Nevezis') return 'Kartok,';
  if (customer === 'Magija') return 'Kartok,';

  // Orlen variations by game
  if (customer === 'Orlen') {
    if (game === 'catch') return 'Venk';
    return 'Rink';
  }

  if (customer === 'Apranga') return 'KARTOKITE,';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'Kartok';
      if (language === 'LV') return 'Atkārtojiet,';
      if (language === 'ET') return 'Korda,';
    }
  }

  // Language-specific defaults
  if (language === 'LV') return 'ATKĀRTO,';
  if (language === 'RU') return 'ПОВТОРИТЬ';
  if (language === 'ET') return 'KORDA';
  if (language === 'EN') return 'REPEAT';
  if (language === 'ES') return 'REPETIR';

  return 'Repeat';
};

// Helper function to get Rule 2 descriptive text based on customer, language, and game
const getRule2Text = (customer, language, game) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return "the bad ones – don't lose your lives.";
    if (language === 'LT') return 'blogų – neprarask gyvybių.';
    if (language === 'RU') return 'плохих - не теряй жизни.';
    if (language === 'LV') return 'no sliktajām - nepazaudē savas dzīvības.';
    if (language === 'ET') return 'halbu - ära kaota elusid.';
    if (language === 'FI') return 'huonoja - mutta varo menettämästä henkeäsi.';
  }

  if (customer === 'Pigu.lt' && language === 'EN') return 'for better result.';
  if (customer === 'Pigu.lt' && language === 'LV') return 'lai sasniegtu labāku rezultātu.';
  if (customer === 'Pigu.lt' && language === 'ET') return 'et tulemus oleks veel parem.';
  if (customer === 'Pigu.lt' && language === 'FI') return 'paremman tuloksen saavuttamiseksi.';
  if (customer === 'Pigu.lt' && language === 'RU') return 'для достижения наилучших результатов.';
  if (customer === 'Pigu.lt' && language === 'LT') return 'dėl geresnio rezultato.';

  // Akropolis variations by language
  if (customer === 'Akropolis' && language === 'LV') return 'lai uzlabotu savu rezultātu.';
  if (customer === 'Akropolis' && language === 'RU') return 'чтобы улучшить свой результат.';

  // Eurovaistine
  if (customer === 'Eurovaistine') return 'un uzlabo savu rezultātu.';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'ir pagerink rezultatą.';
      if (language === 'LV') return 'lai uzlabotu savu rezultātu.';
      if (language === 'ET') return 'et oma skoori parandada.';
    }
  }

  // Doodle game LV special
  if (game === 'doodle' && language === 'LV') return 'lai uzlabotu savu rezultātu.';

  // Drive game LV special
  if (language === 'LV' && game === 'drive') return 'kuponus un iegūsti punktus';

  // General LV
  if (language === 'LV') return 'lai sasniegtu labāku rezultātu.';

  // General RU
  if (language === 'RU') return 'для лучшего результата';

  // Toni variations by game
  if (customer === 'Toni' && game === 'catch') return 'los helados Topsy para ganar puntos.';
  if (customer === 'Toni' && game === 'crush') return '3 o más, helados Topsy iguales.';
  if (customer === 'Toni' && game === 'flappy') return 'los obstáculos en el camino.';
  if (customer === 'Toni' && game === 'doodle') return 'sin caerte de las plataformas.';

  // General ET
  if (language === 'ET') return 'kaarte ja teeni puntke.';

  // Pieno Žvaigždės
  if (customer === 'Pieno Žvaigždės') return 'siekdamas kuo geresnio rezultato.';

  // Pegasas
  if (customer === 'Pegasas') return 'siekdamas kuo geresnio rezultato.';

  // Drive game Ikea special
  if (game === 'drive' && customer === 'Ikea') return 'jei nesate patenkinti rezultatu.';

  // Fpro
  if (customer === 'Fpro') return 'FOR BETTER RESULT';

  // SaludSA
  if (customer === 'SaludSA') return '3 veces para mejorar';

  // Gamtos Ateitis variations
  if (customer === 'Gamtos Ateitis Paper' && game === 'catch') return 'popieriaus pakuočių atliekas ir gauk taškų.';
  if (customer === 'Gamtos Ateitis Glass' && game === 'catch') return 'stiklo pakuočių atliekas ir gauk taškų.';
  if (customer === 'Gamtos Ateitis Plastic' && game === 'catch') return 'plastiko pakuočių atliekas ir gauk taškų.';
  if (customer.includes('Gamtos Ateitis') && game === 'crush') return 'geresnio rezultato.';

  // Novaturas variations by language
  if (customer === 'Novaturas' && language === 'LT') return 'korteles ir gauk taškus.  ';
  if (customer === 'Novaturas' && language === 'LV') return 'kārtis un iegūsti punktus ';
  if (customer === 'Novaturas' && language === 'ET') return 'kaarte ja teeni puntke.';
  if (customer === 'Novaturas' && language === 'EN') return 'cards and earn points.  ';
  if (customer === 'Novaturas' && language === 'RU') return 'карты и зарабатывайте пункты.  ';

  // General EN
  if (language === 'EN') return 'to get the best possible result';

  // General ES
  if (language === 'ES') return 'los empaques para ganar puntos.';

  // Nykstukas
  if (customer === 'Nykstukas') return 'ledų kliūtis.';

  // Nevezis
  if (customer === 'Nevezis') return 'siekdamas kuo geresnio rezultato.';

  // Orlen variations by game
  if (customer === 'Orlen' && game === 'catch') return 'draudžiamų ženklų.';
  if (customer === 'Orlen') return 'ledus ir gauk taškus. ';

  // Perlas GO
  if (customer === 'Perlas GO') return 'siekdamas kuo geresnio rezultato.';

  // Apranga
  if (customer === 'Apranga') return 'siekdami geresnio rezultato.';

  // Default fallback
  return 'to improve your score.';
};

// Helper function to get Rule 3 title based on customer, language, and game
const getRule3Title = (customer, language, game, userId) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'Repeat';
    if (language === 'LT') return 'Kartok';
    if (language === 'RU') return 'Повторяй';
    if (language === 'LV') return 'Atkārto';
    if (language === 'ET') return 'Korda';
    if (language === 'FI') return 'Toista';
  }

  if (customer === 'Pigu.lt' && language === 'EN') return 'Enjoy ';
  if (customer === 'Pigu.lt' && language === 'LV') return 'Izbaudi ';
  if (customer === 'Pigu.lt' && language === 'ET') return 'Naudi ';
  if (customer === 'Pigu.lt' && language === 'FI') return 'Nauti ';
  if (customer === 'Pigu.lt' && language === 'RU') return 'Приятной ';
  if (customer === 'Pigu.lt' && language === 'LT') return 'Mėgaukis ';

  // Toni variations by game
  if (customer === 'Toni' && game === 'catch') return 'Evita';
  if (customer === 'Toni' && game === 'crush') return 'Acumula Más Puntos';
  if (customer === 'Toni' && (game === 'flappy' || game === 'doodle')) return 'Vuelve';

  // Fpro
  if (customer === 'Fpro') return 'WIN';

  // Ikea
  if (customer === 'Ikea') return 'Laimėkite,';

  // Perlas GO variations based on userId
  if (customer === 'Perlas GO' && !userId) return 'Registruokis';
  if (customer === 'Perlas GO') return 'Mėgaukis';

  // Eurovaistine
  if (customer === 'Eurovaistine') return 'LAIMĒ';

  // SaludSA
  if (customer === 'SaludSA') return '¡Gana!';

  // Gamtos Ateitis
  if (customer.includes('Gamtos Ateitis')) return 'Kartok,';

  // Nykstukas
  if (customer === 'Nykstukas') return 'Kartok';

  // Nevezis
  if (customer === 'Nevezis') return 'Mėgaukis';

  // Magija
  if (customer === 'Magija') return 'Mėgaukis';

  // Orlen
  if (customer === 'Orlen') return 'Kartok';

  // Novaturas with LT language
  if (customer === 'Novaturas' && language === 'LT') return 'Kartok';

  // Akropolis variations by language
  if (customer === 'Akropolis' && language === 'LV') return 'LAIMĒ';
  if (customer === 'Akropolis' && language === 'RU') return 'ВЫИГРЫВАЙ';

  // Zemaitijos Pienas
  if (customer === 'Zemaitijos Pienas') {
    if (language === 'LT') return 'Mėgaukis';
    if (language === 'LV') return 'Baudi';
  }

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'Mėgaukis';
      if (language === 'LV') return 'Izbaudi';
      if (language === 'ET') return 'Naudi';
    }
  }

  // Apranga
  if (customer === 'Apranga') return 'MĖGAUKITĖS';

  // Language-specific defaults
  if (language === 'LV') return 'Atkārto';
  if (language === 'ET') return 'Proovi';
  if (language === 'EN') return 'Repeat';
  if (language === 'RU') return 'Повторяйте';
  if (language === 'ES') return 'Vuelve';

  // Default fallback
  return 'Enjoy';
};

// Helper function to get Rule 3 descriptive text based on customer, language, and game
const getRule3Text = (customer, language, game, userId) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'and aim for the record.';
    if (language === 'LT') return 'ir siek rekordo.';
    if (language === 'RU') return 'и стремись к рекорду.';
    if (language === 'LV') return 'un uzlabo savu rezultātu.';
    if (language === 'ET') return 'ja püstita rekord.';
    if (language === 'FI') return 'ja yritä saavuttaa ennätys.';
  }

  if (customer === 'Pigu.lt' && language === 'EN') return 'the game. ';
  if (customer === 'Pigu.lt' && language === 'LV') return 'spēli. ';
  if (customer === 'Pigu.lt' && language === 'ET') return 'mängu. ';
  if (customer === 'Pigu.lt' && language === 'FI') return 'pelistä. ';
  if (customer === 'Pigu.lt' && language === 'RU') return 'игры.';
  if (customer === 'Pigu.lt' && language === 'LT') return 'žaidimu. ';

  // Eurovaistine
  if (customer === 'Eurovaistine') return 'kādu no 50 balvām!';

  // LV language with LemonFeel
  if (language === 'LV' && customer === 'LemonFeel') return 'spēli.';

  // LV language with LemonGym
  if (language === 'LV' && customer === 'LemonGym') return 'spēli.';

  // Toni variations by game
  if (customer === 'Toni' && game === 'catch') return 'los palitos vacíos para no perder vidas.';
  if (customer === 'Toni' && game === 'crush') return 'combinando helados con splash de leche.';
  if (customer === 'Toni' && (game === 'flappy' || game === 'doodle')) return 'a jugar para incrementar tus oportunidades de ganar y participa por increíbles premios.';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'žaidimu.';
      if (language === 'LV') return 'spēli.';
      if (language === 'ET') return 'mängu.';
    }
  }

  // Gamtos Ateitis
  if (customer.includes('Gamtos Ateitis')) return 'pagerinus rezultatą prisidės taškų skirtumas.';

  // Pieno Žvaigždės
  if (customer === 'Pieno Žvaigždės') return 'kassavaitinius Forum Cinema bilietus ir pagrindinius MIAU prizus!';

  // Pegasas
  if (customer === 'Pegasas') return '1 iš 80 Pegaso knygų, kas dvi savaites!';

  // LemonGym
  if (customer === 'LemonGym') return 'Lemon Gym narystes kas mėnesį!';

  // Perlas GO variations based on userId
  if (customer === 'Perlas GO' && !userId) return '„Perlas Go" savitarnoje </br> arba mobiliojoje programėlėje.';
  if (customer === 'Perlas GO') return 'žaidimu.';

  // Fpro
  if (customer === 'Fpro') return 'UP TO 20% OFF!';

  // Barbora
  if (customer === 'Barbora') return 'iš karto!';

  // Corepetitus
  if (customer === 'Corepetitus') return 'COREPETITUS priedą!';

  // Ikea
  if (customer === 'Ikea') return 'ir prizą atsiimkite iš karto!';

  // Fantazijos
  if (customer === 'Fantazijos') return 'net 69 Fantazijos.lt prizus!';

  // Makalius
  if (customer === 'Makalius') return 'MAKALIAUS kuponus!';

  // Akropolis variations by language
  if (customer === 'Akropolis' && language === 'LT') return '1 iš 2000 kavos puodelių kasdien!';
  if (customer === 'Akropolis' && language === 'LV') return 'katru dienu!';
  if (customer === 'Akropolis' && language === 'RU') return 'каждый день!';

  // Daumantu
  if (customer === 'Daumantu') return 'Daumantų prizus!';

  // SaludSA
  if (customer === 'SaludSA') return 'premios Saludsa Vitality y participa </br> en el sorteo de increíbles premios.';

  // Vilvi
  if (customer === 'Vilvi') return 'kasdien!';

  // Dentsu
  if (customer === 'Dentsu') return '1 mėn. prieigą  prie interaktyvios tikslinės auditorijos!';

  // Nykstukas
  if (customer === 'Nykstukas') return 'siekiant kuo geresnio rezultato.';

  // Nevezis
  if (customer === 'Nevezis') return 'žaidimu.';

  // Magija
  if (customer === 'Magija') return 'žaidimu.';

  // Zemaitijos Pienas
  if (customer === 'Zemaitijos Pienas') {
    if (language === 'LV') return 'spēli!';
  }

  // Orlen
  if (customer === 'Orlen') return ' ir  pagerink rezultatą.';

  // Apranga
  if (customer === 'Apranga') return 'žaidimu.';

  // Doodle game LV special
  if (language === 'LV' && game === 'doodle') return 'katru dienu!';

  // Drive game variations
  if (language === 'LV' && game === 'drive') return 'un uzlabo savu rezultātu';
  if (language === 'ET' && game === 'drive') return 'uuesti ja paranda oma tulemust.';

  // General ET language
  if (language === 'ET') return 'auhinnad.';

  // Language-specific defaults
  if (language === 'LT') return 'ir pagerink rezultatą.';
  if (language === 'LV') return 'un uzlabo savu rezultātu';
  if (language === 'ET') return 'uuesti ja paranda oma tulemust.';
  if (language === 'EN') return 'and improve your score.';
  if (language === 'RU') return 'и улучшайте свой результат';
  if (language === 'ES') return 'a jugar para incrementar tus oportunidades de ganar y participa por increíbles premios.';

  // Default fallback
  return 'the game.';
};

// Helper function to get Rule 4 title based on customer, language, and game
const getRule4Title = (customer, language, game) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'Win';
    if (language === 'LT') return 'Laimėk';
    if (language === 'RU') return 'Выигрывай';
    if (language === 'LV') return 'Laimē';
    if (language === 'ET') return 'Võida';
    if (language === 'FI') return 'Voita';
  }

  if (customer === 'Pigu.lt' && language === 'EN') return 'Win ';
  if (customer === 'Pigu.lt' && language === 'LV') return 'Laimē  ';
  if (customer === 'Pigu.lt' && language === 'ET') return 'Võida  ';
  if (customer === 'Pigu.lt' && language === 'FI') return 'Voita  ';
  if (customer === 'Pigu.lt' && language === 'RU') return 'Выигрывай ';
  if (customer === 'Pigu.lt' && language === 'LT') return 'Laimėk';

  // Novaturas variations by language
  if (customer === 'Novaturas' && language === 'LT') return 'Laimėk';
  if (customer === 'Novaturas' && language === 'LV') return 'Laimē';
  if (customer === 'Novaturas' && language === 'ET') return 'Võida ';
  if (customer === 'Novaturas' && language === 'EN') return 'Win ';
  if (customer === 'Novaturas' && language === 'RU') return 'Выигрывайте ';

  // Customer-specific rules
  if (customer === 'LemonFeel') return '28.AUGUSTĀ';
  if (customer === 'Apranga') return 'LAIMĖKITE';
  if (customer === 'Nevezis') return 'Laimėk';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return 'Laimėk PS5!';
      if (language === 'LV') return 'Laimē PS5!';
      if (language === 'ET') return 'Võida PS5!';
    }
  }

  // Language-specific defaults
  if (language === 'LV') return 'LAIMĒ';
  if (language === 'ET') return 'VÕIDA';

  // Default fallback
  return 'Win';
};

// Helper function to get Rule 4 descriptive text based on customer, language, and game
const getRule4Text = (customer, language, game) => {
  // Pigu.lt variations by language
  if (customer === 'Pigu.lt' && game === 'catch') {
    if (language === 'EN') return 'prizes!';
    if (language === 'LT') return 'prizus!';
    if (language === 'RU') return 'призы!';
    if (language === 'LV') return 'balvas!';
    if (language === 'ET') return 'auhindu!';
    if (language === 'FI') return 'palkintoja!';
  }

  if (customer === 'Pigu.lt' && language === 'EN') return 'prizes! ';
  if (customer === 'Pigu.lt' && language === 'LV') return 'balvas!';
  if (customer === 'Pigu.lt' && language === 'ET') return 'auhindu!';
  if (customer === 'Pigu.lt' && language === 'FI') return 'palkintoja!';
  if (customer === 'Pigu.lt' && language === 'RU') return 'призы!';
  if (customer === 'Pigu.lt' && language === 'LT') return 'prizus!';

  // Gamtos Ateitis special
  if (customer.includes('Gamtos Ateitis')) return 'koncertą savo mokyklai!';

  // Customer-specific rules
  if (customer === 'LemonGym') return 'LEMON GYM balvas!';
  if (customer === 'Nevezis') return 'puikius „oho!" prizus!';
  if (customer === 'Magija') return 'belaides „Magija" ausines, „Magija" </br> sūrelių dėžutę arba „Magija" puodelį!';
  if (customer === 'Nykstukas') return 'vertingus prizus kas savaitę!';
  if (customer === 'Orlen') return '1 000 ledų kas savaitę!';

  // Novaturas variations by language
  if (customer === 'Novaturas' && language === 'LT') return ' „Novaturas" prizus!';
  if (customer === 'Novaturas' && language === 'LV') return 'Novatours atlaižu kuponus!';
  if (customer === 'Novaturas' && language === 'ET') return 'Novatoursi auhindu!';
  if (customer === 'Novaturas' && language === 'EN') return ' „Novaturas" prizus!';
  if (customer === 'Novaturas' && language === 'RU') return 'призы от Novatours!';

  // LemonFeel special
  if (customer === 'LemonFeel') return 'apbalvosim labāko spēlētāju';

  if (customer === 'Elesen') {
    if (game === 'doodle') {
      if (language === 'LT') return '';
      if (language === 'LV') return '';
      if (language === 'ET') return '';
    }
  }

  // Language-specific defaults
  if (language === 'LT') return 'prizus!';
  if (language === 'LV') return 'balvas!';
  if (language === 'ET') return 'auhindu!';

  // Default fallback
  return 'prizes!';
};

// Rules container
export class InputContainer {
  constructor() {
    this.isMobile = window.innerWidth <= 1280;
    this.config = localStorageService.getDefaultConfig();
    this.customer = this.config.business_name;
    this.language = this.config.language;
    this.game = this.config.game;
    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;
  }

  createInputContainerDiv() {
    this.userBestScore = this.config.userBestScore ? this.config.userBestScore : 0;
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('input-container');
    containerDiv.setAttribute('id', 'input-container');
    containerDiv.style.width = document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px';
    containerDiv.style.background = `none`;
    containerDiv.style.backgroundSize = 'cover';
    containerDiv.style.zIndex = 9999;

    const userId = this.config.userId;
    containerDiv.innerHTML = `

    <div style="width: 100%; height: ${'180px'};box-sizing:content-box; padding-top: 20px; padding-bottom: 50px; border-top-right-radius: 20px;border-top-left-radius: 20px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 19px; display: inline-flex">
    
    <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: center; align-items: center; display: flex">
    <div style="margin-top:-20px;align-self: stretch; text-align: center; color: white; font-size: 32px; font-family:${'Georama'}; font-weight: 700; line-height: 21.60px; word-wrap: break-word;">  ${`<div style="${this.customer === 'Ikea' ? 'margin-left:20px' : ''};color: #FFF;text-align: ${
      this.customer === 'Ikea' ? 'start' : 'center'
    } ;font-size: 30px;font-style: normal;font-weight: 700;line-height: 130%; /* 52px */letter-spacing: -0.16px;text-transform: uppercase;">${getRulesTitle(this.customer, this.language)}</div>`}</div>
    <div style="width: ${this.isMobile ? '370px' : '390px'};margin-top:10px;margin-bottom:10px;height:${
      this.customer.includes('Gamtos Ateitis') ||
      this.customer === 'Nykstukas' ||
      this.customer === 'LemonGym' ||
      this.customer === 'Magija' ||
      this.customer === 'Orlen' ||
      this.customer === 'Novaturas' ||
      this.customer === 'Nevezis' ||
      this.customer === 'Pigu.lt' ||
      this.customer === 'Zemaitijos Pienas' ||
      this.customer === 'LemonFeel' ||
      this.customer === 'Apranga' ||
      this.customer === 'Elesen' ||
      this.customer === 'Toni'
        ? '150px'
        : '110px'
    }; color: white; font-size: 14px;font-weight: 700; line-height: 35.20px; word-wrap: break-word;text-align:start;"> ${`<div style="width: 100%; height: 120px; position: relative">
 
          <div style="width:100%; height: 120px; left: 20px; top: 0px; position: absolute">
            <div style="left: 0px; top: -10px;display:flex; align-items: baseline; position: absolute; color: white; font-size: ${'20px'}; font-family:${'Georama'}; font-weight: 700; line-height: 20px; word-wrap: break-word">
              <span style="white-space: nowrap;">1. ${getRule1Title(this.customer, this.language, this.game)}</span>
              <div style="position:initial; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-weight: 700; margin-left: 4px; font-family: ${'Georama'}; word-wrap: break-word; white-space: normal; line-height: 14px;">
                ${getRule1Text(this.customer, this.language, this.game)}
              </div>

            </div>
            <div style="left: 0px; top: 30px;display:flex; align-items: baseline; position: absolute; color: white; font-size: ${'20px'}; font-family:${'Georama'}; font-weight: 700; line-height: 20px; word-wrap: break-word">
              <span style="white-space: nowrap;">2. ${getRule2Title(this.customer, this.language, this.game)}</span>
              <div style="position:initial; margin-left:4px; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${'Georama'}; font-weight: 700; word-wrap: break-word; white-space: normal; line-height: 14px;">
                ${getRule2Text(this.customer, this.language, this.game)}
              </div>
            </div>
            <div style="left: 1px; top: 70px;display:flex; align-items: baseline; position: absolute; color: white; font-size: ${'20px'}; font-family:${'Georama'}; font-weight: 700; line-height: 20px; word-wrap: break-word;">
              <span style="white-space: nowrap;">3. ${getRule3Title(this.customer, this.language, this.game, userId)}</span>
              <div style="position:initial; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${'Georama'}; font-weight: 700; margin-left:4px; word-wrap: break-word; white-space:normal; line-height:14px;">
                ${getRule3Text(this.customer, this.language, this.game, userId)}
              </div>
            </div>
${
  this.customer.includes('Gamtos Ateitis') ||
  this.customer === 'Nykstukas' ||
  this.customer === 'Nevezis' ||
  this.customer === 'Magija' ||
  this.customer === 'Pigu.lt' ||
  this.customer === 'Zemaitijos Pienas' ||
  this.customer === 'Apranga' ||
  this.customer === 'Elesen'
    ? `<div style="left: 1px; top: 110px;display:flex; align-items: baseline; position: absolute; color: white; font-size: ${'20px'}; font-family:${'Georama'}; font-weight: 700; line-height: 20px; word-wrap: break-word;">
              <span style="white-space: nowrap;">4. ${getRule4Title(this.customer, this.language, this.game)}</span>
              <div style="position:initial; color: white; font-size: ${this.isMobile ? '12px' : '14px'}; font-family:${'Georama'}; font-weight: 700; margin-left:4px; word-wrap: break-word; white-space:normal; line-height:14px;">
                ${getRule4Text(this.customer, this.language, this.game)}
              </div>
            </div>`
    : ``
}
          </div>
        </div>`}</div>
    ${
      this.customer === 'Barbora' ||
      this.customer === 'Fpro' ||
      this.customer === 'Fantazijos' ||
      this.customer === 'LemonGym' ||
      this.customer === 'Makalius' ||
      this.customer === 'Corepetitus' ||
      this.customer === 'Pieno Žvaigždės' ||
      this.customer === 'Pegasas' ||
      this.customer === 'Eurovaistine' ||
      this.customer.includes('Gamtos Ateitis') ||
      this.customer === 'Akropolis' ||
      this.customer === 'Pigu.lt' ||
      this.customer === 'SaludSA' ||
      this.customer === 'Vilvi' ||
      this.customer === 'Zemaitijos Pienas' ||
      this.customer === 'Ikea' ||
      this.customer === 'Nykstukas' ||
      this.customer === 'LemonGym' ||
      this.customer === 'Nevezis' ||
      this.customer === 'Magija' ||
      this.customer === 'Orlen' ||
      this.customer === 'LemonFeel' ||
      this.customer === 'Novaturas' ||
      this.customer === 'Elesen' ||
      this.customer.includes('demo')
        ? `<div id="startRulesButtonClick" style="align-self: stretch; text-align:center; color: white; font-size: 10px; font-family:${'Georama'}; font-weight: 500; line-height: 21.60px; word-wrap: break-word;"><a target="_blank" rel="noopener noreferrer" ${
            this.customer === 'Novaturas' && this.language === 'LT'
              ? 'href=https://www.novaturas.lt/zaidimo-taisykles'
              : this.customer === 'Novaturas' && this.language === 'LV'
                ? 'href=https://www.novatours.lv/speles-noteikumi'
                : this.customer === 'Novaturas' && this.language === 'ET'
                  ? 'href=https://www.novatours.ee/mangu-reeglid'
                  : this.customer === 'Novaturas' && this.language === 'RU'
                    ? 'href=https://www.novatours.lv/ru/pravila-igri'
                    : this.config.campaignUrlOrCurrentPage.includes('pigu')
                      ? this.language === 'RU'
                        ? `href=https://pigu.lt/ru/t/zaidimo-taisykles-jump`
                        : `href=https://pigu.lt/lt/t/zaidimo-taisykles-jump`
                      : this.config.campaignUrlOrCurrentPage.includes('220')
                        ? this.language === 'RU'
                          ? `href=https://220.lv/ru/t/game-rules-jump`
                          : `href=https://220.lv/lv/t/game-rules-jump `
                        : this.config.campaignUrlOrCurrentPage.includes('kaup24')
                          ? this.language === 'RU'
                            ? `href=https://kaup24.ee/ru/t/game-rules-jump `
                            : `href=https://kaup24.ee/et/t/game-rules-jump `
                          : this.config.campaignUrlOrCurrentPage.includes('hobbyhall')
                            ? this.language === 'EN'
                              ? `href=https://hobbyhall.fi/fi/t/game-rules-jump `
                              : `href=https://hobbyhall.fi/fi/t/game-rules-jump `
                            : this.customer === 'SaludSA'
                              ? 'href=https://ventas.saludsa.com/reglas-juego'
                              : this.customer === 'Barbora'
                                ? 'href=https://www.barbora.lt/info/akciju-zaidimu-taisykles'
                                : this.customer === 'Eurovaistine'
                                  ? 'href=https://www.e-euroaptieka.lv/ker-un-laime-speles-noteikumi'
                                  : this.customer === 'Unisend' && this.language === 'LV'
                                    ? 'href=https://unisend.lv'
                                    : this.customer === 'Unisend' && this.language === 'ET'
                                      ? 'href=https://unisend.ee'
                                      : this.customer === 'LemonGym'
                                        ? 'href=https://www.lemongym.lv/wp-content/uploads/2025/05/LEMON-GYM-LV-speles-noteikumi.pdf'
                                        : this.customer === 'Ikea'
                                          ? 'href=https://www.ikea.lt/en/zaidimo-ar-gerai-vairuojate-taisykles'
                                          : this.customer === 'Makalius'
                                            ? 'href=https://www.makalius.lt/gimtadienio-zaidimo-taisykles/'
                                            : this.customer === 'Fantazijos'
                                              ? 'href=https://www.fantazijos.lt/zaidimo-taisykles'
                                              : this.customer === 'Fpro'
                                                ? 'href=https://fpro.com/'
                                                : this.customer === 'Corepetitus'
                                                  ? 'href=https://www.corepetitus.lt/zaidimo-taisykles'
                                                  : this.customer === 'Pieno Žvaigždės'
                                                    ? 'href=https://www.boomio.com/pieno-zvaigzdes-miau-zaidimo-taisykles'
                                                    : this.customer === 'Pegasas'
                                                      ? 'href=https://www.pegasas.lt/c/pegaso-zaidimo-taisykles/'
                                                      : this.customer === 'Akropolis' && this.language === 'LV'
                                                        ? 'href=https://www.akropoleriga.lv/lv/jauns/spele-un-laime-kfc-balvas-katru-dienu-speles-noteikumi/41828'
                                                        : this.customer === 'Akropolis'
                                                          ? 'href=https://www.akropolis.lt/view-file/14247_%C5%BDaidi%20ir%20kava%20kasdien%20laimi_Kavos_%C5%BEaidimas_2025.pdf'
                                                          : this.customer === 'Elesen' && this.language === 'LT'
                                                            ? 'href=https://www.elesen.lt/konkursu-taisykles'
                                                            : this.customer === 'Elesen' && this.language === 'LV'
                                                              ? 'href=https://www.euronics.lv/speles-noteikumi'
                                                              : this.customer === 'Elesen' && this.language === 'ET'
                                                                ? ''
                                                                : this.language === 'LV' && this.customer === 'Fantazijos'
                                                                  ? 'href=https://docs.google.com/document/d/1QNzkm_j-Sn73LsykBYgFAfwg0Ij2TeM5/edit'
                                                                  : this.language === 'RU' && this.customer === 'Fantazijos'
                                                                    ? 'href=https://docs.google.com/document/d/1PN05AH1AQUL6iiENuVVeVBJGip6Ia6w1/edit'
                                                                    : this.customer.includes('Gamtos Ateitis')
                                                                      ? 'href=https://gamtosateitis.lt/wp-content/uploads/2025/05/Taisykles_word.pdf'
                                                                      : this.customer === 'Zemaitijos Pienas'
                                                                        ? 'href=https://www.boomio.com/zemaitijos-pienas-protein-m-zaidimo-taisykles'
                                                                        : this.customer === 'Nykstukas'
                                                                          ? 'href=https://www.nykstukozaidimas.lt/taisykles/'
                                                                          : this.customer === 'Magija'
                                                                            ? 'href=https://www.boomio.com/zemaitijos-pienas-magija-zaidimo-taisykles'
                                                                            : this.customer === 'Nevezis'
                                                                              ? 'href=https://ohosausryciai.lt/zaidimo-taisykles.html'
                                                                              : this.customer === 'LemonFeel'
                                                                                ? 'href=https://www.lemongym.lv/wp-content/uploads/2025/05/LEMON-FEEL-speles-noteikumi.pdf'
                                                                                : this.customer === 'Orlen'
                                                                                  ? 'href=https://www.orlen.lt/LT/zaidimas/Puslapiai/taisykl%c4%97s.aspx'
                                                                                  : `href=${window.location.href}`
          } style="color:white;font-size:14px;margin-top:6px;font-family:${'Georama'};">${
            this.customer === 'Pigu.lt' && this.language === 'EN'
              ? 'Read the detailed game rules.'
              : this.customer === 'Pigu.lt' && this.language === 'LV'
                ? 'Izlasi detalizētos spēles noteikumus.'
                : this.customer === 'Pigu.lt' && this.language === 'ET'
                  ? 'Loe mängu täpseid reegleid.'
                  : this.customer === 'Pigu.lt' && this.language === 'FI'
                    ? 'Lue tarkat säännöt.'
                    : this.customer === 'Pigu.lt' && this.language === 'RU'
                      ? 'Ознакомься с подробными правилами игры.'
                      : this.customer === 'Pigu.lt'
                        ? 'Skaityk išsamias žaidimo taisykles'
                        : this.customer === 'Elesen' && this.language === 'LT'
                          ? 'Skaitykite išsamias žaidimo taisykles.'
                          : this.customer === 'Elesen' && this.language === 'LV'
                            ? 'Izlasi detalizētos spēles noteikumus.'
                            : this.customer === 'Elesen' && this.language === 'ET'
                              ? ''
                              : this.customer === 'Fpro'
                                ? 'Read full games rules. '
                                : this.customer === 'SaludSA'
                                  ? 'Revisa las reglas completas del juego.'
                                  : this.customer === 'Ikea'
                                    ? 'Visos žaidimo taisyklės'
                                    : this.customer === 'LemonFeel'
                                      ? 'Lasīt pilnos spēles noteikumus'
                                      : this.customer === 'Akropolis' && (this.language === 'LV' || this.language === 'RU')
                                        ? ''
                                        : this.customer.includes('Gamtos Ateitis')
                                          ? 'Skaityk išsamias žaidimo taisykles.'
                                          : this.language === 'LT'
                                            ? 'Skaityk išsamias žaidimo taisykles'
                                            : this.language === 'LV'
                                              ? 'Izlasi detalizētos spēles noteikumus.'
                                              : this.language === 'RU'
                                                ? 'Ознакомьтесь с полными правилами игры.'
                                                : this.language === 'ET'
                                                  ? 'Loe kõiki mängureegleid.'
                                                  : 'Read the full game rules'
          } </a></div>
           
          ${
            this.customer === 'Pigu.lt' && false
              ? ` <div class="boomio-rules-privacyCheckbox" id="boomio-rules-privacyCheckbox" style="margin-left:30px;cursor:${'pointer'} ;left: 34px;  justify-content: center; align-items: center; gap: 5px; display: inline-flex">
      <div  style=" display: ${'inline-flex'};cursor: ${'pointer'};">
            <img id="boomio-rules-privacyCheckbox-img" src="${uncheckIcon}" style="max-width:fit-content;width: 20px; height: 20px;">
        </div>
        <div style="color: ${'white'}; font-size: ${'10px'}; font-family:${'Montserrat'} ;width:calc(100% - 50px);  font-weight: 400; word-wrap: break-word;line-height:14px;text-align:start;">
        ${
          this.customer === 'Pigu.lt' && this.language === 'EN'
            ? 'I agree to receive game news and information about prizes, and for my data to be processed for this purpose.'
            : this.customer === 'Pigu.lt' && this.language === 'LV'
              ? 'Es piekrītu saņemt spēles jaunumus un informāciju par balvām, kā arī piekrītu manu datu apstrādei šim nolūkam'
              : this.customer === 'Pigu.lt' && this.language === 'ET'
                ? 'Nõustun saama teavet mängu uudiste ja auhindade kohta ning luban oma andmete töötlemise selleks otstarbeks.'
                : this.customer === 'Pigu.lt' && this.language === 'FI'
                  ? 'Hyväksyn, että minulle lähetetään tietoja pelistä ja palkinnoista, ja että tietojani käsitellään tätä tarkoitusta varten.'
                  : this.customer === 'Pigu.lt' && this.language === 'RU'
                    ? 'Я соглашаюсь получать новости о игре и информацию о призах, а также на обработку моих данных с этой целью.'
                    : 'Sutinku gauti žaidimo naujienas ir informaciją apie prizus, bei kad mano duomenys būtų tvarkomi šiuo tikslu.'
        }
    </div>
      </div>         <div id="boomio-rules-checkbox-error" style="margin-left:16px;padding-top:1px;margin-right:14px;display:${'none'} ;top:${'270px'}; position: absolute; justify-content: start; align-items: start; gap: 5px;font-size:${
        this.isMobile ? '8px' : '10px'
      };color:${'#D8000C'};text-align:start;line-height:8px;">
</div>`
              : ''
          }
          `
        : ''
    }
    </div>
    <div>
    </div>
              </div>
              <div style="z-index:3;justify-content: center; align-items: center; gap: 20px;display:flex; width:${
                document.documentElement.clientWidth < 426 ? (document.documentElement.clientWidth < 321 ? '375px' : document.documentElement.clientWidth + 'px') : '426px'
              };" id="control-button" class="control-button">
              <div id="startButtonClick" style="cursor:pointer;box-shadow:-4px -4px 8px #DFE6F5 inset; margin-left:27px;margin-right:27px;width: 100%; height:38px;background: white
              ; border-radius: 35px; overflow: hidden; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
              <div style="text-align: center; font-size: 20px; font-family:${'Georama'}; font-weight: ${
                this.customer === 'Ikea' ? '400' : '700'
              }; line-height: 20px; word-wrap: break-word"> <div style="line-height:20px;text-align: center; color: ${
                this.customer === 'Toni' ? '#000F9F' : 'rgba(61, 73, 40, 1)'
              }; font-size: 20px;  line-height: 20px; word-wrap: break-word">${
                this.customer === 'Pigu.lt' && this.language === 'EN'
                  ? 'NEXT'
                  : this.customer === 'Pigu.lt' && this.language === 'LV'
                    ? 'TĀLĀK'
                    : this.customer === 'Pigu.lt' && this.language === 'ET'
                      ? 'JÄRGMINE'
                      : this.customer === 'Pigu.lt' && this.language === 'FI'
                        ? 'SEURAAVA'
                        : this.customer === 'Pigu.lt' && this.language === 'RU'
                          ? 'ДАЛЕЕ'
                          : this.customer === 'Pigu.lt' && this.language === 'LT'
                            ? 'PIRMYN'
                            : this.customer === 'Akropolis' && this.language === 'LT'
                              ? 'SUTINKU'
                              : this.customer === 'Akropolis' && this.language === 'LV'
                                ? 'PIEKRĪTU NOTEIKUMIEM'
                                : this.customer === 'Akropolis' && this.language === 'RU'
                                  ? 'Я согласен с правилами'
                                  : this.language === 'LV'
                                    ? 'TĀLĀK'
                                    : this.language === 'RU'
                                      ? 'ДАЛЕЕ'
                                      : this.language === 'ET'
                                        ? 'EDASI'
                                        : this.language === 'ES'
                                          ? 'SIGUIENTE'
                                          : this.customer === 'Barbora' ||
                                              this.customer === 'Fantazijos' ||
                                              this.customer === 'LemonGym' ||
                                              this.customer === 'Corepetitus' ||
                                              this.customer === 'Pieno Žvaigždės' ||
                                              this.customer.includes('Gamtos Ateitis') ||
                                              this.customer === 'Makalius' ||
                                              this.customer === 'Daumantu' ||
                                              this.customer === 'Pegasas'
                                            ? 'PIRMYN'
                                            : this.customer === 'Fpro'
                                              ? 'PLAY'
                                              : this.customer === 'SaludSA'
                                                ? 'SIGUIENTE'
                                                : this.customer === 'Vilvi'
                                                  ? 'SUTINKU'
                                                  : this.customer === 'Perlas GO'
                                                    ? 'SUTINKU'
                                                    : this.language === 'LT'
                                                      ? 'SUTINKU'
                                                      : 'CONTINUE'
              }</div></div>
    </div>
 
    `;

    return containerDiv;
  }
}
