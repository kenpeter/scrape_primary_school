# Intro

Hire me at [https://www.linkedin.com/in/thegaryliang](https://www.linkedin.com/in/thegaryliang)

This project scrapes [this website](https://bettereducation.com.au/school/Primary/vic/melbourne_top_government_primary_schools.aspx) for best primary schools in Melbourne, Australia, and displays
on Google map.

Demo: [http://schoolfront1.shopshop.space/](http://schoolfront1.shopshop.space/)

# Design
There are 3 sub projects for this website.
* Utility to scrape data: [https://github.com/kenpeter/scrape_primary_school](https://github.com/kenpeter/scrape_primary_school)
* Back-end: [https://github.com/kenpeter/scrape_primary_school_back](https://github.com/kenpeter/scrape_primary_school_back)
* Front-end: [https://github.com/kenpeter/scrape_primary_school_front](https://github.com/kenpeter/scrape_primary_school_front)

# Flow
We scrape some data from [https://bettereducation.com.au/school/Primary/vic/melbourne_top_government_primary_schools.aspx](https://bettereducation.com.au/school/Primary/vic/melbourne_top_government_primary_schools.aspx) and store it in MongoDB.

The back-end pulls data from MongoDB and supplies data via API. (Uising Mongo and Express)

Front-end uses Redux, Mobx and Google map to display data.

![alt img](https://github.com/kenpeter/scrape_primary_school/raw/master/misc/scrape_primary_school.png)

# Install
Scrapper: 
```git clone https://github.com/kenpeter/scrape_primary_school.git```

```yarn install```

Front-end:
```git clone https://github.com/kenpeter/scrape_primary_school_front.git```

```yarn install```

Back-end:
```git clone https://github.com/kenpeter/scrape_primary_school_back.git```

```yarn install```
