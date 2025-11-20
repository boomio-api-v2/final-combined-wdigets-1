# Image URL Migration Report

**Date:** November 20, 2025  
**Repository:** boomio-api-v2/final-combined-wdigets-1

## Summary

This report identifies all image URLs that are NOT hosted on the official GitHub repository and need migration.

---

## ✅ Fixed Issues

### 1. Incorrect GitHub URL Format (Fixed)

**Issue:** URLs using `https://github.com/.../blob/main/` instead of `https://raw.githubusercontent.com/.../main/`

**Files Fixed:**

- ✅ `src/constants/icons.js` - 9 URLs fixed
- ✅ `src/widgets/iceWidget/constants.js` - 13 URLs fixed

---

## ⚠️ External Image Hosts Requiring Migration

### 2. i.ibb.co Image Host (imgbb.com)

**Total:** 17 images hosted externally on i.ibb.co

#### Files Affected:

**src/widgets/driveWidget/driveWidget.js:**

- `https://i.ibb.co/wrHgcn1/Blur-game-rules.png`
- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`
- `https://i.ibb.co/fdFppDg/New-best-score.png`

**src/widgets/runnerWidget/runnerWidget.js:**

- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`
- `https://i.ibb.co/fdFppDg/New-best-score.png`

**src/widgets/popWidget/popWidget.js:**

- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`

**src/widgets/flappyBird/flappyBird.js:**

- `https://i.ibb.co/SrtXMFx/Boomio-demo-penguin.png`
- `https://i.ibb.co/xq7Yf83/Boomio-demo-3-1.png`
- `https://i.ibb.co/mBmxsKP/Group-1000001725.png`
- `https://i.ibb.co/LvmQXcC/BOOMIO-TAP-ELEMENT.gif`
- `https://i.ibb.co/d74HGX8/Button-Yellow-2.png`
- `https://i.ibb.co/kGkXBHq/Game-over-2.png`
- `https://i.ibb.co/0Bqvttk/PLAY-AGAIN.png`
- `https://i.ibb.co/nL70YWF/OK.png`
- `https://i.ibb.co/sK74MHP/Rules-1.png`
- `https://i.ibb.co/wrHgcn1/Blur-game-rules.png`
- `https://i.ibb.co/dGnFRp1/Button-use-it.png`
- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`

**src/widgets/doodleWidget/doodleWidget.js:**

- `https://i.ibb.co/wrHgcn1/Blur-game-rules.png`
- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`

**src/widgets/crushWidget/crushWidget.js:**

- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`

**src/widgets/catchWidget/catchWidget.js:**

- `https://i.ibb.co/wrHgcn1/Blur-game-rules.png`
- `https://i.ibb.co/P43Lwwz/New-demo-best-score.gif`

**src/constants/icons.js:**

- ✅ Fixed: `winningAnimationGif` now uses `winningConfetinGif.gif` from repo

---

### 3. github.com/kbnvch External Repository

**Total:** 40+ images from external GitHub user account

**Repository Sources:**

- `github.com/kbnvch/bla` - 1 image
- `github.com/kbnvch/boomio` - 3 images
- `github.com/kbnvch/crates` - 16 images
- `github.com/kbnvch/eziukai_uogiene` - 20+ images

#### Files Affected:

**src/constants/icons.js:**

**Hammer/Chest Images:**

- `hammerImage: https://github.com/kbnvch/bla/blob/main/hammer01.png?raw=true`
- `closedChestImage: https://github.com/kbnvch/boomio/blob/main/chest1.png?raw=true`
- `openedChestImage: https://github.com/kbnvch/boomio/blob/main/chest3.png?raw=true`
- `cloudImage: https://github.com/kbnvch/boomio/blob/main/expl5.png?raw=true`

**Crate Images (6):**

- `crate1` through `crate6: https://github.com/kbnvch/crates/blob/main/aaa[1-6].png?raw=true`

**Fish Images (2):**

- `fishHeapImg1-2: https://github.com/kbnvch/crates/blob/main/fish0[1-2].png?raw=true`

**Pole Images (2):**

- `pole1-2: https://github.com/kbnvch/crates/blob/main/p[1-2].png?raw=true`

**Cat Images (8):**

- `cat1_1` through `cat1_4: https://github.com/kbnvch/crates/blob/main/ct1_0[1-4].png?raw=true`
- `cat2_1` through `cat2_4: https://github.com/kbnvch/crates/blob/main/ct2_0[1-4].png?raw=true`

**Ground & Background:**

- `ground: https://github.com/kbnvch/crates/blob/main/ground2.png?raw=true`
- `backgroundImg: https://github.com/kbnvch/crates/blob/main/dot.png?raw=true`

**Hedgehog/Eziukas Images (20+):**

- `eziukas10-13: ziukas0-3.png` (4 images)
- `eziukas20-21: zjump1-2.png` (2 images)
- `eziukas30: eeziukas33.png` (1 image)
- `machine1, fullJar, emptyJarWthLid, stiklainis1` (4 images)
- `jar00-jar09: theJar2_000 through theJar2_009.png` (10 images)
- `handle1-3: handl01-03.png` (3 images)
- `drip1-5: drp1-5.png` (5 images)
- `hand1-2: rr1-2.png` (2 images)

All from: `https://github.com/kbnvch/eziukai_uogiene/blob/main/`

---

## 🎯 Recommended Actions

### Immediate Actions:

1. **Download all i.ibb.co images** - These are hosted on a third-party image host that could disappear
2. **Download all github.com/kbnvch images** - External dependency on another user's repository
3. **Upload to official repository** under `images/` folder with organized subfolders
4. **Update all affected files** to use the new URLs

### Migration Steps:

```bash
# 1. Create folders for organized storage
mkdir -p images/common/ui
mkdir -p images/common/effects
mkdir -p images/widgets/cats
mkdir -p images/widgets/hedgehog

# 2. Download images from i.ibb.co
# - Blur-game-rules.png → images/common/ui/
# - New-demo-best-score.gif → images/common/effects/
# - New-best-score.png → images/common/ui/
# ... (all other i.ibb.co images)

# 3. Download images from github.com/kbnvch
# - Organize by widget type (cats, hedgehog, etc.)

# 4. Update source files with new URLs
```

### Proposed URL Structure:

```
https://raw.githubusercontent.com/boomio-api-v2/final-combined-wdigets-1/main/images/
  common/
    ui/
      - blur-game-rules.png
      - new-best-score.png
      - button-yellow.png
      - game-over.png
      - etc.
    effects/
      - new-demo-best-score.gif
      - confetti.gif
  widgets/
    cats/
      - (all cat-related images)
    hedgehog/
      - (all hedgehog/eziukas images)
    flappy/
      - (flappy bird specific images)
```

---

## 📊 Statistics

- **Total External URLs Found:** 57+
- **Fixed (GitHub blob format):** 22
- **Remaining (i.ibb.co):** 17
- **Remaining (github.com/kbnvch):** 40+

---

## ⚠️ Risk Assessment

**HIGH RISK:**

- **i.ibb.co images** - Third-party image hosting service
  - Could delete images without notice
  - No version control
  - Service could shut down

**MEDIUM RISK:**

- **github.com/kbnvch images** - External GitHub repository
  - User could delete repository
  - Images could be modified
  - Repository could become private

**Recommendation:** Migrate ALL external images to official repository ASAP.

---

## Next Steps

1. Review this report
2. Download all external images
3. Organize images in proper folder structure
4. Update all source files with new URLs
5. Test all widgets to ensure images load correctly
6. Remove external dependencies

---

_This report was generated as part of the image URL standardization effort for the Boomio widgets platform._
