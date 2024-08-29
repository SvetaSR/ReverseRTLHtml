#### Overview
This is a simple script for going over HTML files and reversing text for RTL languages such as Hebrew and Arabic.

#### How to use for fixing Calibre books
If you are using it to fix ePub files converted badly by Calibre, here's a quick tutorial:
A. Convert your book as you usually would with Calibre.
B. Once it's done, left-click the book and click on "Edit", or press "T" which is a shortcut.
C. In the edit screen you'll see a left panel with all the files that are contained in the ePub file. Look for all of the HTML files. It should look like this:

![image](https://github.com/user-attachments/assets/a9b5de92-71cb-44c4-8f13-62d328a265f6)

Select all of the **HTML** files, right-click, and select "Export all X selected files". 
Create an "input" folder inside this project, and choose it as the destination.
Open CMD (or terminal if you're on Mac) and navigate to the project root folder. 
Run `node index.js`.
The script will generate an "output" folder with all of the converted files.

D. Go back to Calibre's ePub Editor.
You can choose to manually copy and paste the new contents to each file, or right-click each HTML and select "Replace X.html file with file...".

When you're done save by pressing ctrl+s/cmd+s.
You're epub is now ready :)

#### Some other tips for RTL configurations for your ePub:
If your book is aligned to the wrong side, in the Calibre Edit locate stylesheet.css
Find `.calibre {`
And add:
`direction: rtl;`

If the book's page-turning is using the wrong direction, locate `content.opf` and change `<spine>` to `<spine toc="ncx" page-progression-direction="rtl">`;

In both cases, don't forget to save :)
