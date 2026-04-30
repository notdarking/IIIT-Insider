INSERT INTO colleges (
    id, name, slug, short_name, description, image_url, region, city, state,
    campus_area, institute_type, established_year, website_url, mentor_institute,
    is_active, created_at, updated_at
) VALUES
(1, 'IIIT Allahabad', 'iiit-allahabad', 'IIITA', 'A centrally funded institute known for information technology, electronics, research culture, and strong placements.', '/src/assets/allahabad.jpeg', 'NORTH', 'Prayagraj', 'Uttar Pradesh', '100 acres', 'Institute of National Importance', 1999, 'https://www.iiita.ac.in', NULL, b'1', NOW(6), NOW(6)),
(2, 'ABV-IIITM Gwalior', 'iiitm-gwalior', 'IIITM Gwalior', 'An institute combining technology and management education with established computer science and integrated programs.', '/src/assets/gwalior.jpeg', 'CENTRAL', 'Gwalior', 'Madhya Pradesh', '160 acres', 'Institute of National Importance', 1997, 'https://www.iiitm.ac.in', NULL, b'1', NOW(6), NOW(6)),
(3, 'IIIT Hyderabad', 'iiit-hyderabad', 'IIITH', 'A research-led institute with deep strengths in computer science, AI, language technologies, robotics, and data systems.', '/src/assets/hyderabad.jpeg', 'SOUTH', 'Hyderabad', 'Telangana', '66 acres', 'Deemed University', 1998, 'https://www.iiit.ac.in', NULL, b'1', NOW(6), NOW(6)),
(4, 'IIIT Delhi', 'iiit-delhi', 'IIITD', 'A state university focused on computer science, electronics, design, social computing, and interdisciplinary research.', '/src/assets/delhi.jpeg', 'NORTH', 'New Delhi', 'Delhi', '25 acres', 'State University', 2008, 'https://www.iiitd.ac.in', NULL, b'1', NOW(6), NOW(6)),
(5, 'IIIT Bangalore', 'iiit-bangalore', 'IIITB', 'A postgraduate and research-focused institute in Bengaluru with strong industry alignment and computing programs.', '/src/assets/banglore.webp', 'SOUTH', 'Bengaluru', 'Karnataka', '9 acres', 'Deemed University', 1999, 'https://www.iiitb.ac.in', NULL, b'1', NOW(6), NOW(6)),
(6, 'IIIT Lucknow', 'iiit-lucknow', 'IIITL', 'A fast-growing institute offering computer science, information technology, and AI-oriented programs.', '/src/assets/lucknow.jpeg', 'NORTH', 'Lucknow', 'Uttar Pradesh', '50 acres', 'Institute of National Importance', 2015, 'https://iiitl.ac.in', 'IIIT Allahabad', b'1', NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    image_url = VALUES(image_url),
    updated_at = NOW(6);

INSERT INTO branches (id, college_id, name, code, description, seats, is_popular, created_at, updated_at) VALUES
(1, 1, 'Information Technology', 'IT', 'Core computing program focused on software systems, networks, and applied information technology.', 120, b'1', NOW(6), NOW(6)),
(2, 1, 'Electronics and Communication Engineering', 'ECE', 'Electronics, communication systems, signal processing, and embedded systems.', 75, b'0', NOW(6), NOW(6)),
(3, 2, 'Computer Science and Engineering', 'CSE', 'Foundational and advanced computing with systems, algorithms, and software engineering.', 90, b'1', NOW(6), NOW(6)),
(4, 2, 'Integrated B.Tech + MBA', 'IT-MBA', 'Technology and management integrated program for product and business leadership roles.', 60, b'0', NOW(6), NOW(6)),
(5, 3, 'Computer Science and Engineering', 'CSE', 'Research-intensive computer science program with strong AI and systems exposure.', 120, b'1', NOW(6), NOW(6)),
(6, 3, 'Electronics and Communication Engineering', 'ECE', 'Electronics, VLSI, signal processing, and communication systems.', 80, b'0', NOW(6), NOW(6)),
(7, 4, 'Computer Science and Applied Mathematics', 'CSAM', 'Computing foundations combined with mathematical modeling and analytics.', 80, b'1', NOW(6), NOW(6)),
(8, 4, 'Computer Science and Design', 'CSD', 'Computer science blended with human-centered design and digital product thinking.', 70, b'0', NOW(6), NOW(6)),
(9, 5, 'Integrated M.Tech Computer Science', 'IMT-CSE', 'Five-year integrated computing program with industry and research orientation.', 150, b'1', NOW(6), NOW(6)),
(10, 6, 'Computer Science and Engineering', 'CSE', 'Modern computing curriculum covering software, algorithms, and applied AI.', 75, b'1', NOW(6), NOW(6)),
(11, 6, 'Computer Science and Artificial Intelligence', 'CSAI', 'Computer science program with focused AI and machine learning coursework.', 60, b'0', NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    seats = VALUES(seats),
    is_popular = VALUES(is_popular),
    updated_at = NOW(6);

INSERT INTO programs (id, college_id, name, degree_level, duration_years, description, created_at, updated_at) VALUES
(1, 1, 'B.Tech Information Technology', 'BTECH', 4, 'Undergraduate program in IT, software engineering, systems, and applied computing.', NOW(6), NOW(6)),
(2, 1, 'M.Tech Information Technology', 'MTECH', 2, 'Postgraduate specialization in advanced computing areas.', NOW(6), NOW(6)),
(3, 2, 'B.Tech Computer Science and Engineering', 'BTECH', 4, 'Undergraduate computer science program.', NOW(6), NOW(6)),
(4, 2, 'Integrated B.Tech + MBA', 'DUAL_DEGREE', 5, 'Integrated technology and management degree.', NOW(6), NOW(6)),
(5, 3, 'B.Tech Computer Science and Engineering', 'BTECH', 4, 'Research-oriented undergraduate program in computer science.', NOW(6), NOW(6)),
(6, 3, 'MS by Research', 'MSC', 2, 'Research degree across computing and electronics domains.', NOW(6), NOW(6)),
(7, 4, 'B.Tech Computer Science and Applied Mathematics', 'BTECH', 4, 'Computing program with mathematical foundations.', NOW(6), NOW(6)),
(8, 5, 'Integrated M.Tech Computer Science', 'MTECH', 5, 'Integrated postgraduate computing program.', NOW(6), NOW(6)),
(9, 6, 'B.Tech Computer Science and Engineering', 'BTECH', 4, 'Undergraduate computer science program.', NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    description = VALUES(description),
    duration_years = VALUES(duration_years),
    updated_at = NOW(6);

INSERT INTO placement_statistics (
    id, college_id, academic_year, average_package_lpa, median_package_lpa,
    highest_package_lpa, placement_percentage, students_placed, total_eligible_students,
    top_recruiters, source_url, created_at, updated_at
) VALUES
(1, 1, '2023-24', 30.68, 25.78, 121.00, 96.20, 410, 426, 'Google, Microsoft, Atlassian, Adobe, Amazon', 'https://www.iiita.ac.in', NOW(6), NOW(6)),
(2, 2, '2023-24', 24.31, 20.00, 65.00, 91.50, 265, 290, 'Amazon, Goldman Sachs, Oracle, Samsung, Deloitte', 'https://www.iiitm.ac.in', NOW(6), NOW(6)),
(3, 3, '2023-24', 32.20, 28.00, 69.00, 98.00, 360, 367, 'Google, Microsoft, Apple, Qualcomm, Nvidia', 'https://www.iiit.ac.in', NOW(6), NOW(6)),
(4, 4, '2023-24', 23.72, 20.80, 49.00, 94.10, 470, 499, 'Microsoft, Adobe, Google, Flipkart, Tower Research', 'https://www.iiitd.ac.in', NOW(6), NOW(6)),
(5, 5, '2023-24', 24.88, 22.00, 65.00, 95.00, 180, 190, 'LinkedIn, Infosys, Accenture, Mercedes-Benz, Intel', 'https://www.iiitb.ac.in', NOW(6), NOW(6)),
(6, 6, '2023-24', 18.42, 16.00, 45.00, 89.50, 135, 151, 'Amazon, Flipkart, Paytm, Infosys, TCS Digital', 'https://iiitl.ac.in', NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    average_package_lpa = VALUES(average_package_lpa),
    median_package_lpa = VALUES(median_package_lpa),
    highest_package_lpa = VALUES(highest_package_lpa),
    placement_percentage = VALUES(placement_percentage),
    updated_at = NOW(6);

INSERT INTO cutoffs (
    id, college_id, branch_id, year, round, counselling_type, category, quota,
    gender, opening_rank, closing_rank, created_at, updated_at
) VALUES
(1, 1, 1, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 850, 4900, NOW(6), NOW(6)),
(2, 1, 2, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 5200, 9100, NOW(6), NOW(6)),
(3, 2, 3, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 4100, 8200, NOW(6), NOW(6)),
(4, 2, 4, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 9000, 14500, NOW(6), NOW(6)),
(5, 3, 5, 2024, 1, 'INSTITUTE', 'OPEN', 'AI', 'Gender-Neutral', 400, 2200, NOW(6), NOW(6)),
(6, 3, 6, 2024, 1, 'INSTITUTE', 'OPEN', 'AI', 'Gender-Neutral', 2300, 6200, NOW(6), NOW(6)),
(7, 4, 7, 2024, 5, 'JOSAA', 'OPEN', 'HS', 'Gender-Neutral', 2100, 7600, NOW(6), NOW(6)),
(8, 4, 8, 2024, 5, 'JOSAA', 'OPEN', 'HS', 'Gender-Neutral', 5000, 11800, NOW(6), NOW(6)),
(9, 5, 9, 2024, 1, 'INSTITUTE', 'OPEN', 'AI', 'Gender-Neutral', 3000, 9800, NOW(6), NOW(6)),
(10, 6, 10, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 7600, 12800, NOW(6), NOW(6)),
(11, 6, 11, 2024, 6, 'JOSAA', 'OPEN', 'AI', 'Gender-Neutral', 8200, 14100, NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    opening_rank = VALUES(opening_rank),
    closing_rank = VALUES(closing_rank),
    updated_at = NOW(6);

INSERT INTO reviews (
    id, college_id, user_id, title, body, rating, pros, cons, is_approved, created_at, updated_at
) VALUES
(1, 1, NULL, 'Strong coding culture', 'Students report strong peer learning, active coding groups, and good placement support.', 5, 'Excellent coding culture, strong alumni network, high placement ceiling.', 'Academic workload can feel intense during project-heavy semesters.', b'1', NOW(6), NOW(6)),
(2, 2, NULL, 'Balanced tech and management exposure', 'The institute suits students who want computing with management and product exposure.', 4, 'Large campus, integrated programs, good return on investment.', 'Some programs are less specialized than pure CSE tracks.', b'1', NOW(6), NOW(6)),
(3, 3, NULL, 'Research-first environment', 'A strong fit for students interested in research, labs, and advanced CS work.', 5, 'Excellent research groups, selective peer group, industry recognition.', 'Admissions and coursework are highly competitive.', b'1', NOW(6), NOW(6)),
(4, 4, NULL, 'Modern curriculum', 'Curriculum is flexible and current, with useful interdisciplinary options.', 4, 'Good city access, modern courses, strong faculty profiles.', 'Campus size is smaller compared with older institutes.', b'1', NOW(6), NOW(6)),
(5, 5, NULL, 'Industry-connected programs', 'Location and industry collaboration make it attractive for postgraduate computing.', 4, 'Bengaluru ecosystem, mature postgraduate programs, good internships.', 'Limited traditional large-campus experience.', b'1', NOW(6), NOW(6)),
(6, 6, NULL, 'Growing institute with momentum', 'A younger IIIT with improving placements and expanding academic offerings.', 4, 'Good growth trajectory, focused CS programs, improving brand recall.', 'Infrastructure and alumni network are still maturing.', b'1', NOW(6), NOW(6))
ON DUPLICATE KEY UPDATE
    body = VALUES(body),
    pros = VALUES(pros),
    cons = VALUES(cons),
    is_approved = VALUES(is_approved),
    updated_at = NOW(6);
