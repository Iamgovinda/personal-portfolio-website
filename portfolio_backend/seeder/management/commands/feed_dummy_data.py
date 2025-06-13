from datetime import date

from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

from portfolio.resume.models import Education, Experience, Skill, Certificate
from portfolio.testimonial.models import Testimonial
from portfolio.user.models import UserInfo, SocialMedia, WhatIDoItem


class Command(BaseCommand):
    help = 'Create 4 testimonial records for portfolio'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        username = "gobinda"
        try:
            user, created = User.objects.get_or_create(username=username, defaults={
                "email": "gobinda.arniko@gmail.com",
                "is_superuser": True
            })
            user.set_password("Internal@1")
            user.save()

            # Create the test user
            if created:
                self.stdout.write(self.style.SUCCESS(f'User {username} was created.'))
            else:
                self.stdout.write(self.style.WARNING(f'User {username} already exists.'))

        except Exception as e:
            print(e)
            exit(1)
        if not UserInfo.objects.filter(user=user):
            # Create the UserInfo object with image fields as null
            UserInfo.objects.create(
                user=user,
                name="Gobinda Jamakatel",
                description="I am a dedicated software and data engineer with a strong passion for continuous learning and professional development. I approach challenges with an analytical mindset, always striving to deliver efficient and thoughtful solutions.",
                experience=4,
                project_completed=10,
                happy_client=5,
                main_image=None,
                address="Ekantakuna 23, Lalitpur",
                email="jamkatelgovinda1@gmail.com",
                phone="9813293156",
                user_about_title="Software/Data Engineer",
                user_about_desc=(
                    "I am a dedicated and detail-oriented software and data engineer with a deep commitment to continuous growth and improvement. "
                    "I take pride in my ability to analyze complex problems, break them down into manageable components, and develop efficient, reliable solutions. "
                    "My work is driven by curiosity and a genuine interest in understanding both systems and data at a fundamental level. "
                    "I approach each project with a strong sense of responsibility, ensuring that I deliver results that are both technically sound and aligned with broader business goals. "
                    "My communication style is clear and thoughtful, enabling me to collaborate effectively with cross-functional teams and contribute meaningfully to shared objectives. "
                    "I believe in the value of lifelong learning, and I constantly seek to expand my expertise by exploring new technologies, refining existing skills, and staying informed about industry trends. "
                    "This mindset helps me adapt quickly in dynamic environments and consistently add value to every team I work with."
                ),
                user_about_image=None,
                what_i_do_desc=(
                    "As a software and data engineer, I design, build, and optimize systems that turn complex data into meaningful insights and robust applications. "
                    "I develop scalable backend services, create efficient data pipelines, and ensure the integrity and performance of data-driven platforms. "
                    "My responsibilities include writing clean, maintainable code, designing system architectures, and collaborating with stakeholders to align technical solutions with business needs. "
                    "I also perform data analysis to uncover patterns, support decision-making, and continuously improve the functionality and efficiency of the tools and systems I work on. "
                    "My role requires a strong foundation in programming, data structures, algorithms, and cloud technologies, along with the ability to adapt and innovate in a fast-evolving technological landscape."
                )
            )
            self.stdout.write(self.style.SUCCESS(f'User Info created for {username}!'))
        # Social links dictionary
        social_links = {
            "Twitter": "http://www.twitter.com",
            "YouTube": "http://www.youtube.com",
            "Instagram": "https://it-it.facebook.com/govinda.jamkatel.98/",
            "LinkedIn": "https://www.linkedin.com/in/gobindajamkatel/",
            "Facebook": "https://it-it.facebook.com/govinda.jamkatel.98/"
        }

        # Create SocialMedia objects
        for name, link in social_links.items():
            SocialMedia.objects.get_or_create(
                user=user,
                name=name,
                link=link
            )
        self.stdout.write(self.style.SUCCESS("4 social media records created successfully."))

        # What I Do items
        items = [
            {
                "title": "Data Engineer",
                "desc": (
                    "As a data engineer, I design and maintain robust data pipelines that collect, "
                    "process, and transform raw data into usable formats for analysis and decision-making. "
                    "I work with large-scale datasets, ensuring data quality, integrity, and efficiency "
                    "across systems. My role also involves building data architectures, optimizing performance, "
                    "and supporting analytics and machine learning workflows with reliable data infrastructure."
                )
            },
            {
                "title": "Software Engineer",
                "desc": (
                    "As a software engineer, I design, develop, and maintain efficient, scalable, and reliable "
                    "software systems that solve real-world problems. My responsibilities include writing clean, "
                    "modular code, reviewing system architecture, and implementing best practices to ensure performance, "
                    "security, and maintainability. I work across the development lifecycle—from gathering requirements "
                    "and planning features to testing, deployment, and post-release support. I collaborate closely with "
                    "cross-functional teams to align technical solutions with business goals and user needs."
                )
            }
        ]

        # Create ORM entries
        for item in items:
            WhatIDoItem.objects.get_or_create(
                user=user,
                title=item["title"],
                desc=item["desc"]
            )

        self.stdout.write(self.style.SUCCESS("2 What I Do items created successfully."))

        # Education data
        educations = [
            {
                "title": "Bachelor's in Computer Science",
                "institute_name": "Tribhuvan University",
                "start_date": date(2019, 1, 1),
                "end_date": date(2023, 12, 31),
                "description": (
                    "Earned my Bachelor's degree in Computer Science from Tribhuvan University. "
                    "Focused on core computing subjects such as algorithms, data structures, databases, "
                    "and system design. Engaged in multiple academic and practical projects throughout the program. "
                    "Graduated with a GPA of 3.56."
                ),
            },
            {
                "title": "+2 Level in Science",
                "institute_name": "Jubilant College",
                "start_date": date(2016, 1, 1),
                "end_date": date(2018, 12, 31),
                "description": (
                    "Studied science at Jubilant College, specializing in physics, chemistry, and mathematics. "
                    "This phase significantly shaped my critical and analytical thinking. I successfully completed "
                    "this level with a GPA of 3.37 in the School Leaving Certificate (SLC)."
                ),
            },
            {
                "title": "Secondary Level",
                "institute_name": "Shree Mahadev Higher Secondary School",
                "start_date": date(2005, 1, 1),
                "end_date": date(2015, 12, 31),
                "description": (
                    "Completed my secondary education at Shree Mahadev Higher Secondary School, where I built a strong academic "
                    "foundation and developed essential study habits. I achieved a GPA of 3.35 in the Secondary Education Examination (SEE)."
                ),
            },
        ]

        # Create Education objects
        for edu in educations:
            Education.objects.get_or_create(
                user=user,
                title=edu["title"],
                institute_name=edu["institute_name"],
                start_date=edu["start_date"],
                end_date=edu["end_date"],
                description=edu["description"],
                still_studying=False,
            )

        self.stdout.write(self.style.SUCCESS("3 education records created successfully."))

        # Experience Data
        # Experience data
        experiences = [
            {
                "title": "Data Engineer",
                "company_name": "Packsize (US Client)",
                "start_date": date(2023, 12, 1),
                "end_date": date(2025, 6, 13),
                "description": (
                    "Built ETL scripts and data pipelines using Snowflake for scalable processing.\n"
                    "Performed data aggregation, quarantining, cleaning, and merging to ensure data quality.\n"
                    "Created custom visualizations with React, D3, and DOMO; developed custom DOMO connectors.\n"
                    "Used Pandas for advanced data manipulation and built robust file-handling scripts.\n"
                    "Ensured consistent, validated pipelines through rigorous testing."
                ),
                "still_working": True
            },
            {
                "title": "Fullstack Software Engineer",
                "company_name": "Insight Workshop",
                "start_date": date(2021, 9, 1),
                "end_date": date(2023, 11, 30),
                "description": (
                    "Led fullstack development for Spark (learnwithspark.com.np) and LEVELUP (levelup.com.np).\n"
                    "Developed backend APIs with Django Rest Framework, designed data models, and implemented permissions.\n"
                    "Worked on analytics, media storage with AWS S3, and async tasks using Celery and Django Q Cluster.\n"
                    "Handled real-time features using Django Channels, deployment with Nginx/Circus/PM2, and Microsoft Teams integration.\n"
                    "Contributed to video processing with FFmpeg and integrated APIs into React frontends."
                ),
                "still_working": False
            },
            {
                "title": "Software Engineer Intern",
                "company_name": "Insight Workshop",
                "start_date": date(2021, 6, 1),
                "end_date": date(2021, 8, 31),
                "description": (
                    "Built a CRUD application using Django to manage data efficiently and provide user-friendly functionality.\n"
                    "Designed and implemented APIs with Django Rest Framework to enable seamless system integration.\n"
                    "Used Git for version control, ensuring effective collaboration and code management.\n"
                    "Explored and practiced React to develop interactive front-end features alongside back-end solutions."
                ),
                "still_working": False
            },
        ]

        # Create Experience objects
        for exp in experiences:
            Experience.objects.get_or_create(
                user=user,
                title=exp["title"],
                company_name=exp["company_name"],
                start_date=exp["start_date"],
                end_date=exp["end_date"],
                description=exp["description"],
                still_working=exp["still_working"],
            )

        # Skill Data
        skills = [
            {"title": "React", "skill_rate": 80},
            {"title": "Django/DRF", "skill_rate": 80},
            {"title": "Javascript", "skill_rate": 80},
            {"title": "Python", "skill_rate": 80},
        ]

        # Create Skill objects
        for skill in skills:
            Skill.objects.get_or_create(
                user=user,
                title=skill["title"],
                skill_rate=skill["skill_rate"]
            )

        # Certificate Data
        # Certificate data
        certificates = [
            {
                "name": "Python Core",
                "certificate_id": "G5WL9STUGQDE",
                "certification_date": "2024-04-04",
                "agency": "Sololearn",
                "link": "https://www.sololearn.com/certificates/CT-WDUAKNXF",
            },
            {
                "name": "Python Data Structures",
                "certificate_id": "MCSWMRZZ9ZNS",
                "certification_date": "2024-03-24",
                "agency": "Sololearn",
                "link": "https://www.sololearn.com/certificates/CT-STCLABPX",
            },
        ]

        # Create Certificate objects
        for cert in certificates:
            Certificate.objects.get_or_create(
                user=user,
                name=cert["name"],
                certificate_id=cert["certificate_id"],
                certification_date=cert["certification_date"],
                agency=cert["agency"],
                link=cert["link"]
            )

        # Testimonial Data
        testimonials_data = [
            {
                "name": "Alice Thompson",
                "company": "NovaTech Solutions",
                "desc": "Working with Gobinda was an absolute pleasure. His attention to detail and ability to solve complex problems was outstanding."
            },
            {
                "name": "Rahul Mehta",
                "company": "CloudFlick Inc.",
                "desc": "Gobinda brings a rare mix of professionalism and creativity. His coding expertise took our project to the next level."
            },
            {
                "name": "Linda Carver",
                "company": "BlueByte Technologies",
                "desc": "He consistently delivers clean and efficient code. Gobinda is an asset to any development team."
            },
            {
                "name": "Tariq Hassan",
                "company": "DataCraft AI",
                "desc": "His data engineering knowledge is exceptional. Gobinda helped us optimize our entire ETL pipeline with finesse."
            },
        ]

        for data in testimonials_data:
            Testimonial.objects.create(user=user, **data)

        self.stdout.write(self.style.SUCCESS("4 testimonial records created successfully."))
