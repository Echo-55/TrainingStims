Training Stims (From Bread & Butter)

So once upon a time there was a really cool mod called Bread and Butter created by Lone_Simon. He has seemingly abandoned the project and user tiddle decided to take on the role of bug fixer to keep it alive as further SPT-AKI versions have been released. However they are busy with life it would seem so I decided to have a crack at it with their permission. 

B&B is/was a pretty expansive mod with a lot of features. I am but a noob when it comes to coding mods. I decided to take on B&B to try to learn how it works. The problem with revitalizing the entire mod is that a lot of the features have been superseded by better mod options. So I decided to pick out a few good features that can live on.

So here is Training Stims :)

This mod adds five new stim injectors to the game. They are available from Therapist at loyalty level 1.
These stims are for helping us noob (and/or bad) EFT players out at low levels and beyond.

****************************************************

Training Stim 1 = Stamina Rate +3 and Weight Limit 0.27 (+27%)

Training Stim 2 = +25 Recoil Control

Training Stim 3 : Endurance +20 and Strength +20

Training Stim 4 : DamageModifier -0.5 (50% less dmg taken) and Health Rate +2

Training Stim 5 : Endurance +40, Strength +40, Recoil Control +40

The values for the buffs are taken directly from B&B.

****************************************************

Let me know if you have suggestions on other stims 


I finally got around to making the config work. Check out config.json
You can enable/disable all stims with enable_all set to true/false
Each stim has configurable price, currency, and effects

If something has "", don't remove them. If it doesn't have "", don't add them

Roubles = "5449016a4bdc2d6f028b456f"
Dollars = "5696686a4bdc2da3298b456a"
Euros = "569668774bdc2da2298b4568"

Syntax for custom buffs (see Training_Stim_1.effect):
[
    {
        "BuffType": "MaxStamina",
        "Chance": 1,
        "Delay": 1,
        "Duration": 4000,
        "Value": 3,
        "AbsoluteValue": true,
        "SkillName": ""
    }
]

You can find the vanilla stim effects here for some examples:
Aki_Data\Server\database\globals.json (search for Stimulator)

You can find all the skills here:
Aki_Data\Server\database\globals.json (search for BuffType)

If you study this mod, you can learn how to add some more custom stims/items yourself
Don't blame me if you break something though :)

Enjoy!

I have to thank SamSWAT for making badass mods and also his mods helped immensely in learning how to make this mod work.

Also thanks to the SPT devs!