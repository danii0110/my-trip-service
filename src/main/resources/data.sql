UPDATE area_code
SET name = '세종'
WHERE name = '세종특별자치시' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '경기'
WHERE name = '경기도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '강원'
WHERE name = '강원특별자치도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '충북'
WHERE name = '충청북도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '충남'
WHERE name = '충청남도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '경북'
WHERE name = '경상북도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '경남'
WHERE name = '경상남도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '전북'
WHERE name = '전북특별자치도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '전남'
WHERE name = '전라남도' AND (sigungucode IS NULL OR sigungucode = '');

UPDATE area_code
SET name = '제주'
WHERE name = '제주도' AND (sigungucode IS NULL OR sigungucode = '');