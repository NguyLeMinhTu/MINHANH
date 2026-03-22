-- Run this script once on minhanh_db (MySQL 8.x)
-- It removes duplicate slug indexes and normalizes FK ON DELETE behavior.

USE minhanh_db;

SET @db := DATABASE();

-- ------------------------------------------------------------
-- 1) Remove duplicate unique indexes on slug
-- Keep the original unique index name "slug" and remove duplicates.
-- ------------------------------------------------------------
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.statistics
      WHERE table_schema = @db
        AND table_name = 'danh_muc_san_pham'
        AND index_name = 'idx_danhmuc_slug'
    ),
    'ALTER TABLE danh_muc_san_pham DROP INDEX idx_danhmuc_slug',
    'SELECT "skip drop idx_danhmuc_slug"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1
      FROM information_schema.statistics
      WHERE table_schema = @db
        AND table_name = 'san_pham'
        AND index_name = 'idx_sanpham_slug'
    ),
    'ALTER TABLE san_pham DROP INDEX idx_sanpham_slug',
    'SELECT "skip drop idx_sanpham_slug"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ------------------------------------------------------------
-- 2) Rebuild foreign keys with explicit ON DELETE actions
-- ------------------------------------------------------------

-- danh_muc_san_pham.parent_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'danh_muc_san_pham'
        AND constraint_name = 'danh_muc_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE danh_muc_san_pham DROP FOREIGN KEY danh_muc_san_pham_ibfk_1',
    'SELECT "skip drop fk danh_muc_san_pham_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'danh_muc_san_pham'
        AND constraint_name = 'danh_muc_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk danh_muc_san_pham_ibfk_1 already exists"',
    'ALTER TABLE danh_muc_san_pham ADD CONSTRAINT danh_muc_san_pham_ibfk_1 FOREIGN KEY (parent_id) REFERENCES danh_muc_san_pham(danh_muc_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- san_pham.danh_muc_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'san_pham'
        AND constraint_name = 'san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE san_pham DROP FOREIGN KEY san_pham_ibfk_1',
    'SELECT "skip drop fk san_pham_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'san_pham'
        AND constraint_name = 'san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk san_pham_ibfk_1 already exists"',
    'ALTER TABLE san_pham ADD CONSTRAINT san_pham_ibfk_1 FOREIGN KEY (danh_muc_id) REFERENCES danh_muc_san_pham(danh_muc_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- bien_the_san_pham.san_pham_id -> CASCADE
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bien_the_san_pham'
        AND constraint_name = 'bien_the_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE bien_the_san_pham DROP FOREIGN KEY bien_the_san_pham_ibfk_1',
    'SELECT "skip drop fk bien_the_san_pham_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bien_the_san_pham'
        AND constraint_name = 'bien_the_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk bien_the_san_pham_ibfk_1 already exists"',
    'ALTER TABLE bien_the_san_pham ADD CONSTRAINT bien_the_san_pham_ibfk_1 FOREIGN KEY (san_pham_id) REFERENCES san_pham(san_pham_id) ON DELETE CASCADE ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- hinh_anh_san_pham.san_pham_id -> CASCADE
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'hinh_anh_san_pham'
        AND constraint_name = 'hinh_anh_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE hinh_anh_san_pham DROP FOREIGN KEY hinh_anh_san_pham_ibfk_1',
    'SELECT "skip drop fk hinh_anh_san_pham_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'hinh_anh_san_pham'
        AND constraint_name = 'hinh_anh_san_pham_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk hinh_anh_san_pham_ibfk_1 already exists"',
    'ALTER TABLE hinh_anh_san_pham ADD CONSTRAINT hinh_anh_san_pham_ibfk_1 FOREIGN KEY (san_pham_id) REFERENCES san_pham(san_pham_id) ON DELETE CASCADE ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- yeu_cau_tu_van.san_pham_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'yeu_cau_tu_van'
        AND constraint_name = 'yeu_cau_tu_van_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE yeu_cau_tu_van DROP FOREIGN KEY yeu_cau_tu_van_ibfk_1',
    'SELECT "skip drop fk yeu_cau_tu_van_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'yeu_cau_tu_van'
        AND constraint_name = 'yeu_cau_tu_van_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk yeu_cau_tu_van_ibfk_1 already exists"',
    'ALTER TABLE yeu_cau_tu_van ADD CONSTRAINT yeu_cau_tu_van_ibfk_1 FOREIGN KEY (san_pham_id) REFERENCES san_pham(san_pham_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- danh_muc_bai_viet.parent_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'danh_muc_bai_viet'
        AND constraint_name = 'FK1l47hoxc2u1i5jwpq38os1ncu'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE danh_muc_bai_viet DROP FOREIGN KEY FK1l47hoxc2u1i5jwpq38os1ncu',
    'SELECT "skip drop fk FK1l47hoxc2u1i5jwpq38os1ncu"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'danh_muc_bai_viet'
        AND constraint_name = 'FK1l47hoxc2u1i5jwpq38os1ncu'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk FK1l47hoxc2u1i5jwpq38os1ncu already exists"',
    'ALTER TABLE danh_muc_bai_viet ADD CONSTRAINT FK1l47hoxc2u1i5jwpq38os1ncu FOREIGN KEY (parent_id) REFERENCES danh_muc_bai_viet(danh_muc_bai_viet_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- bai_viet.danh_muc_bai_viet_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bai_viet'
        AND constraint_name = 'bai_viet_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE bai_viet DROP FOREIGN KEY bai_viet_ibfk_1',
    'SELECT "skip drop fk bai_viet_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bai_viet'
        AND constraint_name = 'bai_viet_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk bai_viet_ibfk_1 already exists"',
    'ALTER TABLE bai_viet ADD CONSTRAINT bai_viet_ibfk_1 FOREIGN KEY (danh_muc_bai_viet_id) REFERENCES danh_muc_bai_viet(danh_muc_bai_viet_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- bai_viet.nguoi_dung_id -> SET NULL
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bai_viet'
        AND constraint_name = 'bai_viet_ibfk_2'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE bai_viet DROP FOREIGN KEY bai_viet_ibfk_2',
    'SELECT "skip drop fk bai_viet_ibfk_2"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'bai_viet'
        AND constraint_name = 'bai_viet_ibfk_2'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk bai_viet_ibfk_2 already exists"',
    'ALTER TABLE bai_viet ADD CONSTRAINT bai_viet_ibfk_2 FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id) ON DELETE SET NULL ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- hinh_anh_bai_viet.bai_viet_id -> CASCADE
SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'hinh_anh_bai_viet'
        AND constraint_name = 'hinh_anh_bai_viet_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'ALTER TABLE hinh_anh_bai_viet DROP FOREIGN KEY hinh_anh_bai_viet_ibfk_1',
    'SELECT "skip drop fk hinh_anh_bai_viet_ibfk_1"'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @sql := (
  SELECT IF(
    EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_schema = @db
        AND table_name = 'hinh_anh_bai_viet'
        AND constraint_name = 'hinh_anh_bai_viet_ibfk_1'
        AND constraint_type = 'FOREIGN KEY'
    ),
    'SELECT "fk hinh_anh_bai_viet_ibfk_1 already exists"',
    'ALTER TABLE hinh_anh_bai_viet ADD CONSTRAINT hinh_anh_bai_viet_ibfk_1 FOREIGN KEY (bai_viet_id) REFERENCES bai_viet(bai_viet_id) ON DELETE CASCADE ON UPDATE RESTRICT'
  )
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT 'Schema fix completed' AS status;
