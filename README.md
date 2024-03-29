<img src="./docs/assets/banner.png" />

calendiary is a desktop application that lets you have an digital diary organized through a calendar. You can create a new daily entry where you can write and make a reflection on your day. You can also look back at previous entries you made through the calendar.

The diary is stored in a set of Markdown files organized through the following folder structure: `{year}/{month}/{day}/{month}-{day}-{year}.md`. calendiary allows you to create a new diary by selecting a new folder to create a new diary or an existing folder to view and edit.

## Photos

### Home Page

<img src="./docs/assets/calendiary-1.png" />
This is the home page of calendiary. You can scroll down and see the other months of the year and also look at available diary entries (days represented in green) for the year. The day in blue represents the current day. The days in grey represent days that have passed and also days that don't have a diary entry. Clicking on any of the days will lead you to the diary page to view/edit the diary entry.

### Diary Page

<img src="./docs/assets/calendiary-2.png" />
This is the diary page for a diary entry. You can make changes to the diary entry with the Markdown editor, and go through the next and previous days. If it's your first time on the current day's diary page, the Markdown file corresponding to the diary entry will be created automatically. A progress bar is at the bottom of the page showing how much percent of the day has passed.

## Downloads

Head to the [releases](https://github.com/ma-ray/calendiary/releases) page.

## Development Instructions

Install dependencies:

```
yarn
```

Start development:

```
yarn dev
```

Build:

```
yarn build
```
