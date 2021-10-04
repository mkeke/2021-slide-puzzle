# Slide puzzle

Sliding tile puzzle (devtober 2021)

# Devtober log

## October 1st

### Ideas

Discovering devtober and thinking about what to make.


## October 2nd

### Decision

Deciding on making a sliding tile puzzle game for mobile and desktop using HTML, CSS and vanilla JavaScript.


## October 3rd

### Features

I want to implement the following features:

- Responsive layout, working on all types of screens
- Playable on desktop and mobile
- Scramble the puzzle
- Click a tile to move into free space
- Tile click moves several tiles if along the same path
- Press arrow keys to move a tile to the free space
- Complete: remove tile grid and display full image. Transition.
- Options button below board. Click toggles options panel
- Option to restart puzzle
- Option to restart with random image
- Option to select tile grid (4x4, 5x5, 6x6..) restarts the game
- SVG icons/symbols 
- Option to select image from predefined list
- Drag-drop image
- Select image from mobile gallery or file upload
- Link to github
- Count moves (on off)
- Timed game (on off)

### Design

Quick and dirty design sketches.

<img src="screenshots/01-design.jpg" />

A bit of padding on the sides. Board + icon to toggle options. Maybe a signature/logo on the lower left.

<img src="screenshots/02-options.jpg" />

Options layer. Select grid size, restart, select image, random image, signature, link to GitHub. Add more icons along the way. (EDIT: I think I'll move the signature out of the options overlay)

<img src="screenshots/03-images.jpg" />

Select image dialog. Select from some predefined images


## October 4th

### Master plan

Making a list of what to do and in what order. More tasks might be added throughout the process, the order might be changed. This list will be updated to reflect the process. 

    - init github project
    - set up codebase, define objects, definitions, ..
    - create responsive layout with current grid size
    - build tile markup, assign background image
        - css class coordinates to align image
        - image must cover all tiles in grid
        - all image ratios must work, not just 1:1
    - runtime css where needed
        - background image as base64 string?
    - grid on top of tiles (before/after)
    - scramble board n times. Don't repeat last step.
        - free space in upper left corner
    - options toggle. svg icon. semitransparent layer
    - click tile handler
    - keypress arrow
    - move tile. 100% increments. update left top on element
    - move multiple tiles along the same path
    - move with transition
    - check if finished. fade out grid. show full image.
    - options pane with icons
    - select new game grid
        - restart game
        - recalc sizes
        - reset runtime css
        - keep current image
    - grid icons 4x4 5x5 6x6 ..
    - restart game (icon). keep image
    - random image, restart
    - drag-drop, restart
    - upload image, restart
    - link to github
    - add process description + screenshots ++ to readme.md

### init GitHub project

Hello, I just created this readme file and a folder for screenshots. Let's go!


## October 5th
## October 6th
## October 7th
## October 8th
## October 9th
## October 10th
## October 11th
## October 12th
## October 13th
## October 14th
## October 15th
## October 16th
## October 17th
## October 18th
## October 19th
## October 20th
## October 21st
## October 22nd
## October 23rd
## October 24th
## October 25th
## October 26th
## October 27th
## October 28th
## October 29th
## October 30th
## October 31st
