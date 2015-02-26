  # script = """
  # tell application "mingkwai"
  #   activate
  #   tell application "System Events" to keystroke "p" using {shift down, command down}
  #   delay 1
  #   tell application "System Events" to click menu button "PDF" of window "Print"
  # end tell"""
  # script = """
  #   tell application "mingkwai"
  #       activate
  #       tell application "System Events" to tell process "mingkwai"
  #           keystroke "p" using {shift down, command down}
  #           click menu button "PDF" of window "Print"
  #       end tell
  #   end tell
  #       """
  # script = """
  #   tell application "mingkwai" to activate
  #   tell application "System Events" to keystroke "p" using {shift down, command down}
  #   delay 1
  #   tell application "System Events" to click menu button "PDF" of window "Print" of application "mingkwai"
  #   delay 1
  #       """
        # click menu button "PDF" of window "Print"
        # click menu item "Save as PDF…" of menu 1 of menu button "PDF" of window "Print"
        # repeat until exists window "Save"
        # end repeat



        # -- Press command+shift+g to show the "Go" drop down sheet
        # keystroke "g" using {command down, shift down}
        # -- Set our location field to our pdfSavePath
        # set value of text field 1 of sheet of window "Save" to pdfSavePath
        # -- Now click the Go button
        # click button "Go" of sheet of window "Save"

        # -- Now that we are in our desired folder, set the file name and save
        # set value of text field 1 of window "Save" to "Special Developer Notes.pdf"

        # click button "Save" of window "Save"
    #         click menu button "PDF" of window "Print"
    #     end tell
    # end tell
            # delay 1 -- or longer, if it takes longer
            # click menu button "PDF" of window "Print"
            # repeat until exists menu 1 of menu button "PDF"
            #         delay 0.5
            #     end repeat
            # click menu item "Save as PDF..." of menu 1 of menu button "PDF" of window "Print"
            # click menu item "Save as PDF…" of menu 1 of menu button "PDF" of window "Print"
    # click menu button "PDF" of window "Print"
    # click menu item "Save as PDF…" of menu 1 of menu button "PDF" of window "Print"
    # tell application "System Events" to key code 48 using shift down
    # tell application "System Events" to key code 48 using shift down
    # tell application "System Events" to key code 48 using shift down
    # tell application "System Events" to key code 48 using shift down
    # tell application "System Events" to key code 48 using shift down
    # tell application "System Events" to key code 49
    # tell application "System Events" to key code 125
    # tell application "System Events" to key code 49
