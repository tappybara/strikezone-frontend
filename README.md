# Strike-Zone
Strike-Zone is a personal project that I have created after learning more about data mining and graphical visualizations from 'Python Crash Course: A Hands-on, Project-based Introduction to Programming'.

The tech stack for this project uses Flask (Python) for the backend, and create-react-app (Javascript/JSX, HTML, CSS) for the frontend.
It also utilizes Firebase for basic API calls.

The project is a web application that displays the pitch locations of a pitcher for a particular game in the 2019 MLB season.
Firebase is used to store and retrieve players belonging to a specific team.
Python scripts are run to retrieve information about the games a pitcher has appeared in and the pitch data for these games. The Python package BeautifulSoup is used to help web scrap this information.

The frontend is hosted on netlify. You may visit the website at: https://strikezone.netlify.com

-----------------------------------------------------------------------------------------------------------------------------------------

For this project, information from third parties have been gathered to make everything work. Below is a list of all sources.

MLB Player IDs (file: player_ids.csv): http://crunchtimebaseball.com/baseball_map.html

MLB Team Map (file: SFBB MLB Team Map - SFBB Team Map.csv): https://www.smartfantasybaseball.com/2015/09/new-tool-mlb-team-id-map/

Pitcher's Previous Starts (ESPN MLB Website):  
example url: http://www.espn.com/mlb/player/gamelog/_/id/39251/year/2019

Game Information (Brooks Baseball (http://www.brooksbaseball.net/pfxVB/pfx.php)):  
example url: http://www.brooksbaseball.net/pfxVB/pfx.php?month=10&day=18&year=2019&game=gid_2019_10_18_houmlb_nyamlb_1%2F&pitchSel=434378&prevGame=gid_2019_10_18_houmlb_nyamlb_1%2F&prevDate=1018&league=mlb
