CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url VARCHAR(255),
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    created_at DATETIME(6),
    updated_at DATETIME(6),
    last_login DATETIME(6),
    INDEX idx_users_username (username),
    INDEX idx_users_email (email)
);

CREATE TABLE IF NOT EXISTS colleges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    slug VARCHAR(180) UNIQUE,
    short_name VARCHAR(150),
    description TEXT,
    image_url VARCHAR(500),
    region ENUM('NORTH', 'SOUTH', 'EAST', 'WEST', 'CENTRAL', 'OTHER') NOT NULL DEFAULT 'OTHER',
    city VARCHAR(100),
    state VARCHAR(100),
    campus_area VARCHAR(100),
    institute_type VARCHAR(80),
    established_year INT,
    website_url VARCHAR(500),
    mentor_institute VARCHAR(150),
    is_active BIT(1) NOT NULL DEFAULT b'1',
    created_at DATETIME(6),
    updated_at DATETIME(6),
    INDEX idx_colleges_region_active (region, is_active),
    INDEX idx_colleges_slug (slug)
);

CREATE TABLE IF NOT EXISTS branches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id BIGINT NOT NULL,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(30) NOT NULL,
    description TEXT,
    seats INT,
    is_popular BIT(1) NOT NULL DEFAULT b'0',
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT uk_branches_college_code UNIQUE (college_id, code),
    CONSTRAINT fk_branches_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS programs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id BIGINT NOT NULL,
    name VARCHAR(120) NOT NULL,
    degree_level ENUM('BTECH', 'MTECH', 'DUAL_DEGREE', 'MBA', 'MSC', 'MDES', 'BDES', 'PHD', 'OTHER') NOT NULL DEFAULT 'OTHER',
    duration_years INT,
    description TEXT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_programs_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS placement_statistics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id BIGINT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    average_package_lpa DECIMAL(10, 2),
    median_package_lpa DECIMAL(10, 2),
    highest_package_lpa DECIMAL(10, 2),
    placement_percentage DECIMAL(5, 2),
    students_placed INT,
    total_eligible_students INT,
    top_recruiters TEXT,
    source_url TEXT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT uk_placements_college_year UNIQUE (college_id, academic_year),
    CONSTRAINT fk_placements_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cutoffs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id BIGINT NOT NULL,
    branch_id BIGINT,
    year INT NOT NULL,
    round INT NOT NULL,
    counselling_type ENUM('JOSAA', 'CSAB', 'DASA', 'UCEED', 'INSTITUTE', 'OTHER') NOT NULL DEFAULT 'JOSAA',
    category VARCHAR(60),
    quota VARCHAR(20),
    gender VARCHAR(20),
    opening_rank INT,
    closing_rank INT,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_cutoffs_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    CONSTRAINT fk_cutoffs_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    college_id BIGINT NOT NULL,
    user_id BIGINT,
    title VARCHAR(150) NOT NULL,
    body TEXT,
    rating INT NOT NULL,
    pros TEXT,
    cons TEXT,
    is_approved BIT(1) NOT NULL DEFAULT b'0',
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_reviews_college FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS device_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL,
    device_type VARCHAR(255) NOT NULL DEFAULT 'WEB',
    device_name VARCHAR(100),
    is_active BIT(1) NOT NULL DEFAULT b'1',
    created_at DATETIME(6),
    last_used_at DATETIME(6),
    max_devices_limit INT DEFAULT 5,
    CONSTRAINT fk_device_tokens_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_device_tokens_user_id (user_id),
    INDEX idx_device_tokens_token (token)
);
