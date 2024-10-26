import CodeRush from "../../../models/codeRush/codeRushSchema.js";

const codeRushController =
{
    postTeam : async (req, res) =>
    {
        const { teamName, teamMembers } = req.body;
        if(!teamMembers || teamMembers.length < 1)
        {
            return res.status(400).json({ message: "Please provide at least one team member." });
        }
        if(!teamName)
        {
            return res.status(400).json({ message: "Please provide a team name." });
        }
        if(teamMembers.length<=1 || teamMembers.length>3)
        {
            return res.status(400).json({ message: "Team Size is 1 to 3" });
        }
        const newTeam = new CodeRush({
            teamName,
            teamMembers
        });
        try
        {
            const team = await newTeam.save();
            res.status(201).json(team);
        }
        catch(error)
        {
            res.status(500).json({ message: error.message });
        }


    }
}

export default codeRushController;