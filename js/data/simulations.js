export const simulations = [
  {
    id: 'ceasefire-negotiation',
    title: 'The Ceasefire Negotiation',
    subtitle: 'Can you broker a ceasefire between two warring generals?',
    icon: '🕊️',
    color: '#2ecc71',
    basedOn: 'Inspired by the Sudan and Ethiopia peace processes',
    introduction: 'You are a UN special envoy dispatched to the capital of a war-torn East African nation. Two rival military factions — one led by General Abara, commander of the national army, and one by General Diallo, leader of a powerful paramilitary force — have been fighting for eight months. Thousands are dead, millions displaced, and the capital is divided. Your mandate: negotiate a ceasefire before the rainy season cuts off humanitarian access to three million people. You have two weeks.',
    nodes: [
      {
        id: 'start',
        text: 'You land at the airport, which is controlled by General Abara\'s forces. Your team is escorted to the UN compound. Your political advisor briefs you: "Both sides are exhausted but neither wants to appear weak. Abara controls the government institutions but Diallo\'s forces hold the western districts and the main supply routes. Regional powers are involved — neighboring countries are backing different sides." How do you begin?',
        choices: [
          { text: 'Request a meeting with General Abara first, since you\'re in territory he controls', next: 'meet-abara' },
          { text: 'Cross into Diallo\'s territory first to show impartiality', next: 'meet-diallo' },
          { text: 'Call a joint meeting at the UN compound immediately', next: 'joint-premature' },
          { text: 'Meet with civil society leaders and community elders first', next: 'civil-society' },
        ],
      },
      {
        id: 'meet-abara',
        text: 'General Abara receives you in the presidential palace. He is formal and controlled. "I am the legitimate commander of this nation\'s armed forces," he says. "Diallo is a warlord and a traitor. I will accept nothing less than his unconditional surrender and disarmament." He shows you evidence of atrocities committed by Diallo\'s forces. How do you respond?',
        choices: [
          { text: 'Acknowledge his grievances and ask what conditions he would accept for a temporary ceasefire', next: 'abara-conditions' },
          { text: 'Remind him that the international community holds both sides responsible for atrocities', next: 'abara-confrontation' },
          { text: 'Propose a humanitarian corridor as a first step, avoiding the political issues', next: 'humanitarian-first' },
        ],
      },
      {
        id: 'meet-diallo',
        text: 'Crossing into Diallo\'s territory is risky. Your convoy is stopped at three checkpoints. When you reach Diallo\'s headquarters — a former school — he greets you warmly but tests you: "So, the UN finally comes to hear our side. Abara has been bombing hospitals and markets. Did he show you those photos when you arrived at his airport?" He knows you just landed. How do you respond?',
        choices: [
          { text: 'Clarify that you came to his side first precisely to hear his perspective', next: 'diallo-trust' },
          { text: 'Acknowledge the suffering on all sides and propose discussing a humanitarian pause', next: 'diallo-humanitarian' },
          { text: 'Present your credentials and lay out a structured negotiation framework', next: 'diallo-formal' },
        ],
      },
      {
        id: 'joint-premature',
        text: 'You send invitations to both generals for a meeting at the UN compound. General Abara\'s office responds that he will attend. General Diallo\'s representative calls back: "General Diallo does not sit at tables arranged by people who have not bothered to understand his position. Come and see what Abara\'s bombs have done to our hospitals, then we\'ll talk." The meeting is off before it starts. You\'ve lost valuable time.',
        choices: [
          { text: 'Travel to Diallo\'s territory to repair the relationship', next: 'meet-diallo' },
          { text: 'Send your deputy to Diallo while you build on Abara\'s willingness to meet', next: 'parallel-track' },
        ],
      },
      {
        id: 'civil-society',
        text: 'You spend your first day meeting with women\'s organizations, religious leaders, and displaced community representatives. They give you crucial intelligence: both generals are facing internal pressure. Abara\'s officers are frustrated by the stalemate. Diallo\'s fighters are running low on supplies. A prominent imam tells you privately that both generals respect him and he could facilitate a back-channel meeting.',
        choices: [
          { text: 'Ask the imam to arrange an informal back-channel meeting between representatives of both generals', next: 'back-channel' },
          { text: 'Use the intelligence to approach General Abara with a tailored proposal', next: 'informed-abara' },
          { text: 'Ask the women\'s organizations to publicly call for a ceasefire, creating political cover', next: 'public-pressure' },
        ],
      },
      {
        id: 'abara-conditions',
        text: 'Abara pauses, then says carefully: "A temporary ceasefire is not surrender. I could consider a 72-hour pause — if Diallo pulls his forces back from the water treatment plant he seized last month. My people need clean water." This is a concrete, limited demand. It could be a starting point.',
        choices: [
          { text: 'Accept this as a basis and go present it to Diallo', next: 'shuttle-to-diallo' },
          { text: 'Push for a longer ceasefire period — 72 hours is not enough for humanitarian access', next: 'push-duration' },
          { text: 'Propose that a neutral force (UN) controls the water plant instead of either side withdrawing', next: 'neutral-proposal' },
        ],
      },
      {
        id: 'abara-confrontation',
        text: 'Abara stiffens. "You come into my house and lecture me about international law? I invited you here in good faith. If the UN cannot distinguish between a legitimate government and rebel terrorists, perhaps this mediation is a waste of time." The meeting ends coldly. You haven\'t lost him, but trust is damaged.',
        choices: [
          { text: 'Send a written apology and request another meeting focused on practical issues', next: 'repair-abara' },
          { text: 'Move on to meet Diallo and come back to Abara later', next: 'meet-diallo' },
        ],
      },
      {
        id: 'humanitarian-first',
        text: 'You propose a humanitarian corridor — a designated safe route for aid convoys to reach civilians on both sides. Abara considers this. "A humanitarian corridor... that could work. But only if international monitors verify that Diallo doesn\'t use it to resupply his forces." This is a pragmatic concern. You now need Diallo\'s agreement.',
        choices: [
          { text: 'Travel to Diallo with this humanitarian corridor proposal', next: 'corridor-to-diallo' },
          { text: 'Work out detailed monitoring mechanisms with Abara before approaching Diallo', next: 'detailed-plan' },
        ],
      },
      {
        id: 'diallo-trust',
        text: 'Diallo nods slowly. "Good. Then look around you." He takes you on a tour of bombed neighborhoods and overwhelmed clinics. Children with shrapnel wounds. A school turned into a morgue. After two hours, he sits you down. "Now you understand why we fight. Abara must be held accountable. But... my people are tired. If there is a way to stop the bombing without surrendering, I am listening."',
        choices: [
          { text: 'Propose a mutual ceasefire with international monitoring', next: 'mutual-ceasefire' },
          { text: 'Suggest starting with a humanitarian pause — 72 hours, no preconditions', next: 'humanitarian-pause' },
          { text: 'Ask what security guarantees he would need to stop fighting', next: 'diallo-guarantees' },
        ],
      },
      {
        id: 'diallo-humanitarian',
        text: 'Diallo agrees that civilians are suffering on both sides but is wary: "Every ceasefire Abara has agreed to in the past, he used to reposition his troops. I need guarantees, not just words." He wants something concrete before he agrees to anything.',
        choices: [
          { text: 'Propose international monitors at all frontline positions during any pause', next: 'monitors-proposal' },
          { text: 'Suggest a confidence-building measure: simultaneous prisoner exchange', next: 'prisoner-exchange' },
        ],
      },
      {
        id: 'diallo-formal',
        text: 'Diallo listens politely to your negotiation framework but interrupts: "With respect, Envoy, this is not a seminar. People are dying every hour. I don\'t need a framework. I need Abara to stop bombing my hospitals. Can you make that happen?" He wants immediate, tangible results.',
        choices: [
          { text: 'Pivot to a concrete proposal: a 48-hour humanitarian pause starting tomorrow', next: 'humanitarian-pause' },
          { text: 'Acknowledge his urgency and ask what a realistic first step would look like from his perspective', next: 'diallo-guarantees' },
        ],
      },
      {
        id: 'back-channel',
        text: 'The imam arranges a secret meeting at his mosque between senior aides of both generals. Your deputy attends as an observer. After four tense hours, the aides agree on one thing: both sides want the fighting in the capital to stop, but neither general can be seen as the one who blinked first. They need a face-saving mechanism.',
        choices: [
          { text: 'Propose that the ceasefire be framed as a "humanitarian obligation" demanded by the international community, so neither side loses face', next: 'face-saving' },
          { text: 'Suggest both generals simultaneously announce the ceasefire at a joint press conference, presenting it as their shared decision', next: 'joint-announcement' },
          { text: 'Propose a third-party demand: ask the African Union to formally request a ceasefire, giving both sides cover', next: 'au-cover' },
        ],
      },
      {
        id: 'informed-abara',
        text: 'Armed with knowledge of Abara\'s internal pressures, you approach him differently: "General, your officers have shown remarkable discipline in a difficult campaign. A strategic pause would allow you to consolidate your positions and demonstrate to the international community that you are a leader who can make peace as well as war." Abara listens with interest. He respects the framing.',
        choices: [
          { text: 'Push further: propose a ceasefire framework that positions Abara as the statesman', next: 'abara-statesman' },
          { text: 'Ask what he needs from Diallo to agree to stop fighting', next: 'abara-conditions' },
        ],
      },
      {
        id: 'public-pressure',
        text: 'The women\'s coalition organizes a massive public demonstration demanding a ceasefire. Hundreds of thousands march in both territories. The international media picks it up. Both generals are forced to respond publicly. Abara says he is "open to a humanitarian pause." Diallo says he "has always wanted peace." Neither can afford to look like the obstacle now. The political space for a deal has opened.',
        choices: [
          { text: 'Move quickly to capitalize on the moment — present both generals with a ceasefire proposal simultaneously', next: 'simultaneous-proposal' },
          { text: 'Use the public pressure to convene formal talks at a neutral venue', next: 'formal-talks' },
        ],
      },
      {
        id: 'shuttle-to-diallo',
        text: 'You bring Abara\'s proposal to Diallo: a 72-hour ceasefire if Diallo withdraws from the water treatment plant. Diallo scoffs: "He wants me to give up the one piece of infrastructure that gives me leverage? I\'ll withdraw from the water plant when he withdraws his snipers from the hospital district." Now you have two demands on the table.',
        choices: [
          { text: 'Propose a simultaneous withdrawal from both positions, monitored by UN observers', next: 'simultaneous-withdrawal' },
          { text: 'Go back to Abara with Diallo\'s counter-demand', next: 'shuttle-back' },
        ],
      },
      {
        id: 'push-duration',
        text: 'You tell Abara that 72 hours is too short for meaningful humanitarian access. He pushes back: "Every day of ceasefire is a day Diallo uses to rearm. I can give you one week, maximum, but only with international monitors ensuring Diallo\'s supply lines are frozen." A week with monitoring — this is a significant offer.',
        choices: [
          { text: 'Accept the one-week framework and bring it to Diallo', next: 'week-to-diallo' },
          { text: 'Push for the monitoring to be reciprocal — both sides\' supply lines monitored', next: 'reciprocal-monitors' },
        ],
      },
      {
        id: 'neutral-proposal',
        text: 'You propose that UN peacekeepers take temporary control of the water treatment plant, ensuring clean water for all civilians while removing it as a military objective. Abara thinks carefully. "If the UN controls the plant and guarantees water distribution to my districts... I could live with that. It removes Diallo\'s leverage without him losing face by retreating." This is creative problem-solving.',
        choices: [
          { text: 'Bring this neutral-zone proposal to Diallo', next: 'neutral-to-diallo' },
          { text: 'Expand the concept: propose multiple neutral zones covering all critical civilian infrastructure', next: 'expanded-neutral' },
        ],
      },
      {
        id: 'parallel-track',
        text: 'Your deputy meets Diallo while you work with Abara. After two days of shuttle diplomacy, a picture emerges: both sides want a ceasefire but under incompatible conditions. Abara wants disarmament first. Diallo wants political recognition first. You need to find a creative middle ground.',
        choices: [
          { text: 'Propose a phased approach: ceasefire first, then parallel tracks for disarmament and political dialogue', next: 'phased-approach' },
          { text: 'Focus on what they agree on: protecting civilians and humanitarian access', next: 'humanitarian-first' },
        ],
      },
      {
        id: 'mutual-ceasefire',
        text: 'Diallo is cautious but receptive. "International monitors? Who pays for them? How fast can they deploy? And what happens when Abara violates the ceasefire — because he will." These are practical questions, not rejection. He\'s thinking about how it could work.',
        choices: [
          { text: 'Promise rapid deployment of UN monitors already in the region and propose automatic sanctions for violations', next: 'concrete-mechanisms' },
          { text: 'Suggest regional observers from trusted neighboring countries instead of UN blue helmets', next: 'regional-monitors' },
        ],
      },
      {
        id: 'humanitarian-pause',
        text: 'You propose a simple 72-hour humanitarian pause — no preconditions, just silence the guns long enough for aid convoys to reach trapped civilians. Diallo says: "Seventy-two hours. No preconditions. And if one of Abara\'s snipers fires a single shot, it\'s over." He agrees in principle. Now you need Abara to match.',
        choices: [
          { text: 'Rush to Abara with the good news and push for immediate implementation', next: 'rush-abara' },
          { text: 'Get Diallo\'s agreement in writing with specific details before approaching Abara', next: 'written-agreement' },
        ],
      },
      {
        id: 'diallo-guarantees',
        text: 'Diallo lays out his needs: "One, our forces are not disbanded — they are integrated into a reformed national army. Two, there must be accountability for the airstrikes on civilian areas. Three, our people must have political representation. These are not negotiable." These are significant demands, but they follow a logical framework.',
        choices: [
          { text: 'Separate immediate needs (ceasefire) from long-term goals (integration, accountability, representation) and propose addressing them in phases', next: 'phased-approach' },
          { text: 'Acknowledge all three demands and commit to including them in a comprehensive peace framework', next: 'comprehensive-framework' },
        ],
      },
      {
        id: 'face-saving',
        text: 'Both sides respond positively to the humanitarian framing. Your team drafts a ceasefire agreement presented as a "response to the humanitarian emergency" rather than a military concession. The key provisions: 14-day ceasefire, UN-monitored buffer zones, humanitarian corridors, and a commitment to begin political talks. Both generals can tell their fighters they stopped fighting to save their people, not because they were losing.',
        choices: [
          { text: 'Present the draft to both sides simultaneously through their aides', next: 'simultaneous-proposal' },
          { text: 'Have the imam deliver the proposal personally to both generals', next: 'imam-delivery' },
        ],
      },
      {
        id: 'simultaneous-proposal',
        text: 'You present identical ceasefire proposals to both generals at the same hour, via trusted intermediaries. Both generals study the document. After 48 hours of back-and-forth on details — the exact location of buffer zones, the composition of monitoring teams, the schedule for humanitarian convoys — both sides agree. The ceasefire is announced simultaneously by both generals in separate statements. The guns fall silent at midnight.',
        choices: [
          { text: 'Move immediately to establish monitoring mechanisms and plan the political talks', next: 'success' },
        ],
      },
      {
        id: 'formal-talks',
        text: 'You convene formal talks at a hotel in a neighboring country. Both delegations arrive with long lists of demands. The first day is consumed by arguments over the shape of the table and who sits where. But on the second day, something shifts. Junior officers from both sides are seen talking in the hallway. By day three, a framework agreement is emerging. It\'s not perfect, but it\'s a start.',
        choices: [
          { text: 'Push to finalize the agreement before the momentum fades', next: 'success' },
          { text: 'Allow the talks to continue at their natural pace to build deeper trust', next: 'partial-trust' },
        ],
      },
      {
        id: 'simultaneous-withdrawal',
        text: 'Both sides agree to a simultaneous withdrawal monitored by UN observers: Diallo pulls back from the water plant, Abara withdraws snipers from the hospital district. The operation is tense — at one checkpoint, a nervous soldier almost fires — but the UN monitors hold the line. With both contentious positions neutralized, the broader ceasefire talks gain momentum.',
        choices: [
          { text: 'Build on this success to negotiate a comprehensive ceasefire', next: 'success' },
        ],
      },
      {
        id: 'phased-approach',
        text: 'You propose three phases: Phase 1 is an immediate ceasefire and humanitarian access. Phase 2 is security arrangements including force integration and cantonment. Phase 3 is political dialogue on governance, elections, and accountability. Crucially, you propose that progress on each phase is linked — neither side gets everything until both sides deliver on their commitments. Both generals are skeptical but agree that Phase 1 is in everyone\'s interest.',
        choices: [
          { text: 'Focus all energy on nailing down Phase 1 details', next: 'written-agreement' },
          { text: 'Ask the African Union to guarantee the phased framework, adding international weight', next: 'au-cover' },
        ],
      },
      {
        id: 'au-cover',
        text: 'The African Union chairperson issues a formal statement demanding an immediate ceasefire and offering to deploy monitors. This gives both generals the cover they need. Within 48 hours, both sides announce they are "complying with the AU\'s call for peace." A 14-day ceasefire begins, with AU and UN monitors deployed to key positions. It\'s fragile, but real.',
        choices: [
          { text: 'Use the ceasefire period to build toward a lasting agreement', next: 'success' },
        ],
      },
      {
        id: 'concrete-mechanisms',
        text: 'You lay out a detailed plan: 200 UN monitors from the existing regional mission, deployed within 72 hours to six key positions. A joint ceasefire monitoring committee with representatives from both sides. Automatic reporting to the Security Council for any violations. Diallo studies the proposal carefully and nods: "If you can actually deploy monitors that fast, I\'ll tell my commanders to hold fire. But get me this in writing."',
        choices: [
          { text: 'Draft the written agreement and shuttle it to Abara for matching approval', next: 'written-agreement' },
        ],
      },
      {
        id: 'written-agreement',
        text: 'Your team works through the night to draft a detailed ceasefire agreement. Both sides negotiate over specific provisions — ceasefire timing, buffer zone coordinates, monitoring protocols, humanitarian corridor routes. After three rounds of revisions, you have a document both sides can accept. The ceasefire is signed at a ceremony attended by AU and UN representatives.',
        choices: [
          { text: 'The ceasefire holds — but maintaining it will require constant vigilance', next: 'success' },
        ],
      },
      {
        id: 'rush-abara',
        text: 'You rush to Abara\'s headquarters. "Diallo agreed to a 72-hour pause, no preconditions!" Abara narrows his eyes. "No preconditions? That\'s suspicious. What is he planning?" Your eagerness has made Abara suspicious rather than encouraged. He wants 48 hours to consult with his commanders. By the time he agrees, Diallo has grown impatient and a skirmish breaks out on the front line. The pause is postponed but not dead.',
        choices: [
          { text: 'Slow down and approach both sides with more careful, synchronized diplomacy', next: 'simultaneous-proposal' },
          { text: 'Focus on stopping the skirmish from escalating into full combat', next: 'partial-escalation' },
        ],
      },
      {
        id: 'partial-escalation',
        text: 'You manage to contain the skirmish through frantic phone calls to both sides. Three soldiers are wounded but no one is killed. The incident actually helps — both generals realize how close they came to destroying the ceasefire opportunity. Within 48 hours, a modified humanitarian pause is agreed: 96 hours with monitors at the most volatile positions.',
        choices: [
          { text: 'Accept this as a win and work to extend it into a longer ceasefire', next: 'partial-ceasefire' },
        ],
      },
      {
        id: 'repair-abara',
        text: 'You send a carefully worded letter acknowledging Abara\'s legitimate authority and expressing your commitment to an impartial process. Abara agrees to meet again. This time, you focus entirely on his concerns. "What do you need to feel safe enough to stop fighting?" He responds with three concrete security demands. You now have a basis for negotiation.',
        choices: [
          { text: 'Take these demands to Diallo and see if there\'s overlap', next: 'shuttle-to-diallo' },
        ],
      },
      {
        id: 'neutral-to-diallo',
        text: 'Diallo is intrigued by the neutral zone concept. "The UN controls the water plant? And Abara\'s forces can\'t come near it either?" He sees the symmetry. "I could agree to this. But I want the same treatment for the main hospital — UN control, neutral zone. My doctors can\'t work with snipers on the roof next door." Now you have a package deal taking shape.',
        choices: [
          { text: 'Return to Abara with the expanded neutral zones proposal', next: 'expanded-neutral' },
        ],
      },
      {
        id: 'expanded-neutral',
        text: 'The concept expands: a network of UN-controlled neutral zones covering the water plant, the main hospital, two schools being used as shelters, and the central market. Both sides agree to withdraw military forces from within 500 meters of these locations. The neutral zones become the nucleus of a broader ceasefire. Humanitarian agencies move in immediately. For the first time in months, children play in the streets near the market.',
        choices: [
          { text: 'Build on the neutral zones to negotiate a comprehensive ceasefire', next: 'success' },
        ],
      },
      {
        id: 'abara-statesman',
        text: 'Abara warms to the idea of being seen as a peacemaker. "If I offer the ceasefire and Diallo accepts, the world will see who is the leader here." He agrees to a 14-day ceasefire announcement, framed as his initiative for the sake of the nation. You carefully present this to Diallo as a mutual opportunity rather than Abara\'s gift.',
        choices: [
          { text: 'Navigate the framing carefully with Diallo', next: 'diallo-framing' },
        ],
      },
      {
        id: 'diallo-framing',
        text: 'Diallo is suspicious of Abara\'s sudden peacemaking stance. "He\'s doing this for cameras, not for peace." You reframe: "General, if you match his ceasefire offer, you prove that you are equally committed to your people. The narrative will be one of two leaders choosing peace." Diallo hesitates, then agrees: "Fine. But the ceasefire agreement must include a timeline for political talks. I won\'t let him use peace as a way to freeze us out."',
        choices: [
          { text: 'Agree to include a political talks timeline and finalize the ceasefire', next: 'success' },
        ],
      },
      {
        id: 'imam-delivery',
        text: 'The imam delivers the proposal with the moral authority that you, as an outsider, cannot carry. He frames it as a religious and moral duty. Both generals, who grew up in the same community and both respect the imam, agree to a meeting at the mosque. It is the first time they have been in the same room since the war began. The meeting is tense, but the imam\'s presence holds. They sign a 30-day ceasefire agreement.',
        choices: [
          { text: 'The ceasefire takes hold', next: 'success' },
        ],
      },
      {
        id: 'shuttle-back',
        text: 'You shuttle between the generals three more times. Each round narrows the gap, but each round also consumes time. On day twelve of your two-week window, the rainy season begins early. Roads flood. Humanitarian convoys cannot move. The pressure becomes desperate. Both generals finally agree to a ceasefire — not because of brilliant diplomacy, but because nature has imposed a de facto truce. You formalize what the rain started.',
        choices: [
          { text: 'Formalize the ceasefire before the rain stops', next: 'partial-ceasefire' },
        ],
      },
      {
        id: 'week-to-diallo',
        text: 'You bring Abara\'s one-week offer to Diallo. He is suspicious of the monitoring condition — "He wants to freeze my supply lines but not his?" — but interested in a week-long pause. "One week, with reciprocal monitoring. His supply lines frozen too. And humanitarian access for our civilians in the eastern districts." These are reasonable counter-terms.',
        choices: [
          { text: 'Shuttle back to Abara with reciprocal monitoring terms', next: 'reciprocal-monitors' },
        ],
      },
      {
        id: 'reciprocal-monitors',
        text: 'You propose reciprocal monitoring to Abara: UN observers at all supply routes on both sides. Abara resists — "I am the government, I have the right to supply my forces" — but eventually concedes when you point out that the international community needs to see good faith from both sides. A seven-day ceasefire with reciprocal monitoring is agreed. It is the first halt in fighting in eight months.',
        choices: [
          { text: 'Work to extend the ceasefire as the seven days begin', next: 'success' },
        ],
      },
      {
        id: 'monitors-proposal',
        text: 'The idea of regional monitors appeals to Diallo. He suggests observers from countries not involved in the conflict. You assemble a list of acceptable nations. Both sides agree on the composition. The monitors deploy within days, lending credibility to the ceasefire framework. With eyes on the ground, violations decrease and confidence slowly builds.',
        choices: [
          { text: 'The monitoring framework supports a lasting ceasefire', next: 'success' },
        ],
      },
      {
        id: 'regional-monitors',
        text: 'Diallo prefers regional observers over UN blue helmets — he trusts neighboring African nations more than the UN Security Council. You contact three potential troop-contributing countries. Two agree to send observers within the week. The monitoring framework is African-led, which gives both sides more ownership.',
        choices: [
          { text: 'Bring this African-led proposal to Abara', next: 'abara-conditions' },
        ],
      },
      {
        id: 'prisoner-exchange',
        text: 'The prisoner exchange idea gains traction with both sides. Each holds around 200 of the other\'s fighters. The ICRC agrees to facilitate. On the day of the exchange, families gather on both sides of the bridge. Mothers embrace sons they thought were dead. The emotional power of the moment silences the hardliners temporarily. Both generals publicly express commitment to further humanitarian steps.',
        choices: [
          { text: 'Use the goodwill to push for a formal ceasefire', next: 'simultaneous-proposal' },
        ],
      },
      {
        id: 'joint-announcement',
        text: 'The joint press conference idea is rejected immediately by both sides. Neither general will stand next to the other. A junior aide says bluntly: "If they\'re in the same room, one of them will end up dead." You need a different approach.',
        choices: [
          { text: 'Propose simultaneous but separate announcements', next: 'face-saving' },
          { text: 'Explore the African Union cover option', next: 'au-cover' },
        ],
      },
      {
        id: 'comprehensive-framework',
        text: 'By committing to address all of Diallo\'s demands in a comprehensive framework, you win his trust — but you\'ve also made promises that will be difficult to deliver. Abara will resist accountability provisions. When you present the framework to Abara, he rejects the accountability clause outright. After days of shuttle diplomacy, you manage a compromise: a truth and reconciliation process instead of criminal tribunals, with the option to escalate "if necessary." It\'s imperfect but it moves things forward.',
        choices: [
          { text: 'Accept the imperfect compromise and secure the ceasefire', next: 'partial-ceasefire' },
        ],
      },
      {
        id: 'detailed-plan',
        text: 'You spend two days with Abara\'s military planners working out detailed monitoring mechanisms: GPS-tracked convoys, UN checkpoints at eight locations, real-time reporting. The plan is thorough. When you bring it to Diallo, he is impressed by the detail but adds his own requirements. Three more days of negotiation produce a robust monitoring framework. Both sides sign. The ceasefire begins ten days into your two-week mission. It\'s tight, but it holds.',
        choices: [
          { text: 'The ceasefire takes effect', next: 'success' },
        ],
      },
      {
        id: 'corridor-to-diallo',
        text: 'Diallo accepts the humanitarian corridor concept but adds a condition: his forces will provide security on his side of the corridor, not UN troops. "I won\'t have foreign soldiers in my territory pretending to be neutral while they report to Abara." This is a trust issue. You propose a compromise: joint patrols with both sides\' forces and UN observers.',
        choices: [
          { text: 'Push for the joint patrol compromise', next: 'neutral-proposal' },
          { text: 'Accept Diallo\'s condition to keep the deal moving', next: 'partial-ceasefire' },
        ],
      },
      {
        id: 'partial-trust',
        text: 'The talks continue for another week. The deeper engagement builds genuine understanding between the delegations, but the generals grow impatient. The formal talks produce a ceasefire agreement with a political roadmap attached. It\'s more comprehensive than a quick deal would have been, but it took longer than the situation really allowed. Several hundred more people died during the extra week of negotiations.',
        isEnding: true,
        outcome: 'partial',
        score: 65,
        realWorldParallel: 'This reflects the painful reality of many negotiations: the tension between getting a quick but shallow deal versus a slow but comprehensive one. In the Ethiopian peace process, the delay between initial contacts and the Pretoria Agreement cost thousands of lives, but the resulting deal was more durable than a rushed agreement might have been.',
      },
      {
        id: 'success',
        text: 'The ceasefire holds. Humanitarian convoys roll through the capital for the first time in eight months. Hospitals receive supplies. Families reunite across ceasefire lines. It is fragile — there are violations, tense moments, and constant shuttle diplomacy to maintain it. But the killing has stopped. Within a month, both sides agree to begin political talks. The road to peace is long, but the first step has been taken. As you board your flight home, your advisor says: "You know this ceasefire could collapse at any moment." You nod. "They all can. But today, people are alive who wouldn\'t be if we hadn\'t tried."',
        isEnding: true,
        outcome: 'success',
        score: 100,
        realWorldParallel: 'This mirrors aspects of the November 2022 Pretoria Agreement that ended the Tigray war in Ethiopia. That agreement was brokered by African Union mediator Olusegun Obasanjo through intensive shuttle diplomacy, back-channel communications, and creative face-saving mechanisms. Like in this scenario, the ceasefire was fragile and required constant maintenance, but it ended the active killing and opened space for humanitarian access.',
      },
      {
        id: 'partial-ceasefire',
        text: 'A ceasefire takes effect, but it is limited in scope and duration. Humanitarian access improves in some areas but not others. Both sides use the pause to reposition. When the ceasefire expires, fighting resumes at a lower intensity. You\'ve bought time and saved lives, but a lasting peace remains elusive. The international community pledges to continue mediation efforts.',
        isEnding: true,
        outcome: 'partial',
        score: 60,
        realWorldParallel: 'Many ceasefires are temporary and incomplete. The 2022 UN-mediated truce in Yemen brought significant relief — Yemeni civilians described it as the first time they could sleep without fear — but it expired without renewal and the underlying conflict remained unresolved. Partial successes can still save thousands of lives and create openings for future diplomacy.',
      },
      {
        id: 'failure',
        text: 'Despite your best efforts, the negotiations collapse. A series of escalatory incidents — a misdirected airstrike, an assassination of a moderate commander, leaked intelligence — destroy the fragile trust you built. Fighting intensifies. The rainy season arrives and millions of civilians are cut off from aid. The international community issues statements of concern but takes no decisive action. You return to New York to report that the mission has failed, carrying the weight of what might have been.',
        isEnding: true,
        outcome: 'failure',
        score: 20,
        realWorldParallel: 'This outcome reflects the many failed mediation attempts in Sudan, where ceasefire agreements have been signed and broken repeatedly since April 2023. The Jeddah process, despite significant international engagement, has been unable to produce a lasting halt in fighting. Spoilers, escalation dynamics, and lack of consequences for violations can overwhelm even skilled mediators.',
      },
    ],
  },
  {
    id: 'power-sharing',
    title: 'The Power-Sharing Agreement',
    subtitle: 'Can you build a government from the ashes of war?',
    icon: '🏛️',
    color: '#3498db',
    basedOn: 'Inspired by the Northern Ireland Good Friday Agreement and the Dayton Accords for Bosnia',
    introduction: 'The war is over — barely. After three years of devastating ethnic conflict between the Northerners and the Southerners in a small European nation, a ceasefire has held for six months. You are the international mediator tasked with designing a power-sharing government that both sides can accept. The Northern leader, President Markovic, commands 55% of the population. The Southern leader, Commander Petrovic, controls 40% of the territory and has a battle-hardened militia. A small minority community, the Romani, makes up 5% and has been victimized by both sides. Failure means a return to war.',
    nodes: [
      {
        id: 'start',
        text: 'You convene the first session of peace talks at a castle in a neutral neighboring country. The atmosphere is toxic. Markovic and Petrovic refuse to shake hands. Each has brought delegations of twenty, including military hardliners who openly despise the other side. Before substantive talks can begin, you must decide how to structure them.',
        choices: [
          { text: 'Start with the hardest issue — the constitutional structure — to show you mean business', next: 'constitution-first' },
          { text: 'Begin with easier confidence-building measures: prisoner releases, missing persons, humanitarian aid', next: 'confidence-building' },
          { text: 'Separate the delegations and shuttle between them until you find common ground', next: 'shuttle-start' },
          { text: 'Include the Romani community representatives as a third party at the table', next: 'romani-inclusion' },
        ],
      },
      {
        id: 'constitution-first',
        text: 'You put the constitutional question on the table immediately: Will the country be a unitary state, a federation, or a loose confederation? Markovic demands a unitary state with a strong central government: "We are the majority. Democracy means majority rule." Petrovic demands a confederation with near-total autonomy for the South: "After what they did to us, we will never be governed by them again." The room erupts. Delegates shout across the table. One Northern delegate walks out.',
        choices: [
          { text: 'Call a recess and meet with each leader privately', next: 'private-meetings' },
          { text: 'Present your own compromise proposal: a federation with shared and devolved powers', next: 'federation-proposal' },
          { text: 'Acknowledge the impasse and pivot to easier issues to build momentum', next: 'confidence-building' },
        ],
      },
      {
        id: 'confidence-building',
        text: 'You propose starting with humanitarian issues: exchanging lists of missing persons, releasing prisoners of war, and allowing displaced families to visit their former homes. Both sides agree — these are issues where cooperation is clearly moral. Over the next three days, 450 prisoners are exchanged. Families learn the fate of loved ones. The mood in the castle shifts slightly. Delegates from opposing sides are seen sharing coffee in the corridor.',
        choices: [
          { text: 'Build on the goodwill to introduce the constitutional question', next: 'gentle-constitution' },
          { text: 'Continue with incremental steps: property restitution, joint policing in mixed areas', next: 'incremental-progress' },
          { text: 'Invite the Romani community to present their needs before moving to structural issues', next: 'romani-testimony' },
        ],
      },
      {
        id: 'shuttle-start',
        text: 'You keep the delegations in separate conference rooms and shuttle between them. This avoids the theatrics of face-to-face confrontation. In private, both leaders are more pragmatic than their public positions suggest. Markovic admits: "I know we can\'t have a purely unitary state. But I need to protect my people\'s majority rights." Petrovic concedes: "Total independence is not realistic. We need economic access to the North. But we need security guarantees."',
        choices: [
          { text: 'Explore a power-sharing executive: rotating presidency, guaranteed cabinet seats for each community', next: 'executive-design' },
          { text: 'Focus on security first: who controls the army, the police, the borders?', next: 'security-focus' },
          { text: 'Map out economic interdependencies to show both sides they need each other', next: 'economic-argument' },
        ],
      },
      {
        id: 'romani-inclusion',
        text: 'Including the Romani representatives is controversial. Markovic objects: "This is a bilateral negotiation." Petrovic is marginally more sympathetic but worries it will complicate things. The Romani delegation leader, Dr. Elena Farkas, makes a powerful statement: "Both armies burned our homes. Both armies killed our children. If you build peace without us, you build it on our graves." The room falls silent.',
        choices: [
          { text: 'Give the Romani a formal seat at the table with veto power on minority rights provisions', next: 'romani-veto' },
          { text: 'Create a separate advisory track for the Romani with guaranteed consultation rights', next: 'romani-advisory' },
          { text: 'Ensure the final agreement includes constitutional protections for all minorities', next: 'minority-protections' },
        ],
      },
      {
        id: 'private-meetings',
        text: 'In private, both leaders are more candid. Markovic tells you: "My hardliners will overthrow me if I accept a confederation. But I could sell a federation if I keep control of foreign policy and the military." Petrovic says: "My people died for self-governance. I need a regional parliament with real power and our own police force." The gap has narrowed from chasm to canyon.',
        choices: [
          { text: 'Draft a federal model with a weak central government and strong regional powers', next: 'weak-center' },
          { text: 'Draft a federal model with shared security but regional autonomy on most domestic issues', next: 'shared-security' },
          { text: 'Propose an asymmetric federation: different levels of autonomy for different regions', next: 'asymmetric-model' },
        ],
      },
      {
        id: 'federation-proposal',
        text: 'You present a detailed federation model: two entities with their own parliaments and police, a shared central government handling foreign affairs, defense, and economic policy, and a constitutional court to arbitrate disputes. Markovic dislikes sharing defense. Petrovic dislikes central economic authority. But neither rejects the framework outright. You have a basis for negotiation.',
        choices: [
          { text: 'Focus on designing the central government: how will executive power be shared?', next: 'executive-design' },
          { text: 'Address the defense question: one army or two?', next: 'security-focus' },
          { text: 'Design the economic framework: one currency, one market, shared revenue?', next: 'economic-argument' },
        ],
      },
      {
        id: 'gentle-constitution',
        text: 'With goodwill established, you introduce the constitutional question gently: "We\'ve shown we can cooperate. Now, what kind of country do your people want to live in?" The discussion is still tense but productive. Both sides present position papers. The fundamental disagreement remains: centralization versus autonomy. But the tone is civil.',
        choices: [
          { text: 'Propose a power-sharing executive as the centerpiece of the new constitution', next: 'executive-design' },
          { text: 'Suggest an international commission to draft the constitutional framework', next: 'international-commission' },
        ],
      },
      {
        id: 'incremental-progress',
        text: 'The incremental approach builds real cooperation. Joint policing pilot programs work in three mixed towns. Property restitution begins. A shared economic commission reopens trade routes. But after two weeks of talks, Petrovic\'s hardliners grow impatient: "We didn\'t fight a war to negotiate garbage collection agreements. Where is the political settlement?" The pressure to address the big questions intensifies.',
        choices: [
          { text: 'Accelerate to the constitutional question while momentum is strong', next: 'gentle-constitution' },
          { text: 'Propose a deadline: full agreement within 10 days or the international community reduces its engagement', next: 'deadline-pressure' },
        ],
      },
      {
        id: 'romani-testimony',
        text: 'Dr. Farkas presents evidence of atrocities committed against Romani communities by both sides: burned villages, mass graves, forced displacement. Both delegations are visibly uncomfortable. Markovic\'s deputy whispers that this is "unhelpful." But Petrovic stands and says quietly: "We owe them a debt. Whatever we agree must protect their rights." It is the first moment of genuine moral leadership from either side.',
        choices: [
          { text: 'Build on Petrovic\'s statement to propose comprehensive minority protections', next: 'minority-protections' },
          { text: 'Use this moral moment to push both sides toward a comprehensive agreement', next: 'moral-momentum' },
        ],
      },
      {
        id: 'executive-design',
        text: 'The executive design becomes the crux of the negotiation. You propose three options: (A) A rotating presidency that alternates between communities every two years. (B) A collective presidency with three members — Northern, Southern, and minority — making decisions by consensus. (C) A prime minister from the largest party with a deputy from the other community and mandatory coalition government.',
        choices: [
          { text: 'Advocate for the collective presidency (B) as the most balanced option', next: 'collective-presidency' },
          { text: 'Advocate for the rotating presidency (A) to give each side a turn at the top', next: 'rotating-presidency' },
          { text: 'Let the parties negotiate among the three options', next: 'parties-choose' },
        ],
      },
      {
        id: 'security-focus',
        text: 'Security is the most emotionally charged issue. Petrovic demands his own army: "We will never again be defenseless against the North." Markovic insists on a single national army: "Two armies means two countries means the next war." Both have legitimate fears rooted in real trauma.',
        choices: [
          { text: 'Propose a phased integration: separate forces now, merged into a single army over 5 years with quotas ensuring proportional representation', next: 'phased-military' },
          { text: 'Propose a NATO-style arrangement: regional forces under a joint command structure with international oversight', next: 'joint-command' },
          { text: 'Suggest an international peacekeeping force bridges the gap while trust is built', next: 'peacekeepers-bridge' },
        ],
      },
      {
        id: 'economic-argument',
        text: 'Your economic advisors present data: the Northern and Southern economies are deeply interdependent. The South has the agricultural land and mineral resources. The North has the ports, universities, and financial sector. Separation would impoverish both. "You are arguing about who controls the house," you tell them, "while the house is burning down. Neither of your economies can survive alone."',
        choices: [
          { text: 'Propose a shared economic space with a single currency and customs union', next: 'economic-union' },
          { text: 'Propose international economic aid conditional on power-sharing agreement', next: 'aid-conditionality' },
        ],
      },
      {
        id: 'romani-veto',
        text: 'Giving the Romani veto power over minority provisions is a bold move. Markovic and Petrovic both object. But Dr. Farkas uses the power wisely — she doesn\'t block progress but ensures that every agreement includes meaningful protections: guaranteed parliamentary seats, anti-discrimination laws, cultural autonomy, and a dedicated ombudsman. The Romani community, for the first time, has a voice in their own future.',
        choices: [
          { text: 'With minority rights secured, focus on the executive power-sharing structure', next: 'executive-design' },
        ],
      },
      {
        id: 'romani-advisory',
        text: 'The advisory track gives the Romani a formal role without threatening the bilateral negotiation. Dr. Farkas uses it effectively, submitting detailed proposals on education rights, property restitution, and political representation. Many of her proposals are adopted. It\'s not perfect — the Romani don\'t have decision-making power — but it\'s more than they\'ve ever had.',
        choices: [
          { text: 'Move to the central constitutional questions with Romani input integrated', next: 'executive-design' },
        ],
      },
      {
        id: 'minority-protections',
        text: 'You draft a comprehensive minority rights chapter: guaranteed seats in all parliaments proportional to population, a human rights court with jurisdiction over discrimination cases, cultural autonomy including education in minority languages, and an international monitoring mechanism. Both sides accept these provisions — protecting minorities is an easy concession when neither side is being asked to give up power.',
        choices: [
          { text: 'Now tackle the hard question: how is executive power shared between the two main communities?', next: 'executive-design' },
        ],
      },
      {
        id: 'weak-center',
        text: 'The weak central government model appeals to Petrovic but alarms Markovic: "If the center has no power, this isn\'t a country — it\'s two countries with a shared postal service." His concern is legitimate. A center too weak to function could collapse, reigniting conflict. International experts warn that Bosnia\'s weak central institutions have created permanent gridlock.',
        choices: [
          { text: 'Strengthen the central government proposal while preserving regional autonomy', next: 'shared-security' },
          { text: 'Accept the weak center but add strong international oversight to compensate', next: 'international-oversight' },
        ],
      },
      {
        id: 'shared-security',
        text: 'You propose a model where defense and border control are shared, but nearly everything else — education, healthcare, policing, taxation — is devolved to the regions. Both sides can accept shared security because it provides mutual protection. The debate shifts to the details: who commands the shared army? How are officers selected? What happens if one region refuses to contribute?',
        choices: [
          { text: 'Propose a joint military command with rotating leadership and proportional representation', next: 'joint-command' },
          { text: 'Suggest international command of shared forces for the first five years during a trust-building period', next: 'peacekeepers-bridge' },
        ],
      },
      {
        id: 'asymmetric-model',
        text: 'The asymmetric federation is creative but complicated. The South gets more autonomy than the North, reflecting its security concerns. The North gets proportional representation in the central government, reflecting its larger population. The Romani get cultural autonomy nationwide. Markovic dislikes the asymmetry: "Why should they get more autonomy than us?" You explain: "Because they have more fear. Asymmetry can be the price of peace."',
        choices: [
          { text: 'Push for Markovic to accept the asymmetry with economic compensations', next: 'economic-compensation' },
          { text: 'Modify the proposal to reduce asymmetry while preserving Southern security guarantees', next: 'modified-asymmetry' },
        ],
      },
      {
        id: 'collective-presidency',
        text: 'The collective presidency model gains traction. Three co-presidents — Northern, Southern, and Romani — would make decisions by consensus with a mechanism for breaking deadlocks (referring disputes to a constitutional court). Both sides see advantages: neither is subordinate to the other. Dr. Farkas is moved to tears at the Romani seat at the highest table. The hardliners on both sides grumble but cannot argue against "three communities, three presidents."',
        choices: [
          { text: 'Lock in the collective presidency and move to resolve the security and economic questions', next: 'final-package' },
        ],
      },
      {
        id: 'rotating-presidency',
        text: 'The rotating presidency creates a problem: who goes first? Markovic argues the larger community should hold the presidency first. Petrovic argues the formerly oppressed community should go first as a gesture of reconciliation. The argument over sequencing threatens to derail the whole negotiation.',
        choices: [
          { text: 'Propose a coin flip — literally. Sometimes the simplest solution works', next: 'coin-flip' },
          { text: 'Suggest a neutral technocratic president for the first two-year term while the rotating mechanism is established', next: 'technocrat-first' },
        ],
      },
      {
        id: 'parties-choose',
        text: 'Letting the parties negotiate among the three options produces an unexpected result. After two days of intense debate, the delegations create a hybrid: a rotating presidency (option A) with a power-sharing cabinet (elements of option C) and a minority affairs council (inspired by option B). It\'s complex and may be difficult to implement, but both sides feel ownership because they designed it together.',
        choices: [
          { text: 'Accept the hybrid and work on making it functional', next: 'final-package' },
        ],
      },
      {
        id: 'phased-military',
        text: 'The phased military integration plan is ambitious: immediate ceasefire consolidation with international monitors, followed by cantonment of forces, then a three-year integration program training soldiers from both sides together. Quotas ensure neither community dominates officer ranks. The plan is modeled on successful military integration in South Africa after apartheid. Both sides accept it as the least bad option.',
        choices: [
          { text: 'With security resolved, push to finalize the complete agreement', next: 'final-package' },
        ],
      },
      {
        id: 'joint-command',
        text: 'The joint command structure requires trust that does not yet exist. You propose international officers in key positions during a transition period, with a training program to develop a shared military culture. Both sides accept the international presence as a bridge. A NATO observer notes dryly: "We\'ll be here for twenty years." Probably. But it prevents the next war.',
        choices: [
          { text: 'Integrate the joint command into the broader constitutional framework', next: 'final-package' },
        ],
      },
      {
        id: 'peacekeepers-bridge',
        text: 'An international peacekeeping force of 10,000 soldiers is deployed. Their presence allows both sides to demobilize without feeling vulnerable. The peacekeepers\' mandate includes protecting minority returns, monitoring compliance, and mentoring a new joint security force. It\'s expensive and imperfect — there are incidents of peacekeepers failing to prevent violence — but it provides the security foundation for political progress.',
        choices: [
          { text: 'Use the security umbrella to finalize the political agreement', next: 'final-package' },
        ],
      },
      {
        id: 'economic-union',
        text: 'The economic union creates shared interests in peace. A single market means both communities prosper or suffer together. International donors pledge $5 billion in reconstruction aid, conditional on the power-sharing agreement holding. Business leaders from both sides begin planning joint ventures. Economic interdependence becomes the glue holding the fragile peace together.',
        choices: [
          { text: 'Package the economic union with the political framework for a comprehensive agreement', next: 'final-package' },
        ],
      },
      {
        id: 'aid-conditionality',
        text: 'International donors pledge massive reconstruction aid — but only if a power-sharing agreement is reached and sustained. This creates powerful incentives for both leaders. Their populations are exhausted and impoverished. Reconstruction means jobs, housing, schools. Failure to agree means continued poverty. The economic pressure pushes both sides toward compromise on difficult political questions.',
        choices: [
          { text: 'Use the donor leverage to push for final concessions on remaining issues', next: 'final-package' },
        ],
      },
      {
        id: 'deadline-pressure',
        text: 'You announce that international engagement will be scaled back in 10 days if no framework is agreed. It\'s a gamble. Markovic calls your bluff initially: "The international community needs this peace deal as much as we do." But when three European foreign ministers cancel planned visits, both sides realize the deadline is real. Negotiations accelerate dramatically. Compromises that seemed impossible become possible under time pressure.',
        choices: [
          { text: 'Push through the remaining issues before the deadline expires', next: 'final-package' },
        ],
      },
      {
        id: 'moral-momentum',
        text: 'The moral weight of the Romani testimony creates a rare moment of shared shame. Both delegations are forced to reckon with what was done in their name. In this window of vulnerability, you present a comprehensive peace framework and ask: "Will you build something better than what came before?" The emotional intensity accelerates the talks. Issues that might have taken weeks are resolved in days.',
        choices: [
          { text: 'Push to finalize the agreement while the moral momentum holds', next: 'final-package' },
        ],
      },
      {
        id: 'international-commission',
        text: 'The international constitutional commission includes legal experts from countries that have managed divided societies: Belgium, Switzerland, South Africa, and Lebanon. They present a menu of institutional options based on global best practices. Having outsiders present the options removes some of the emotion — neither side feels they are accepting the other\'s proposal.',
        choices: [
          { text: 'Let the commission facilitate the constitutional negotiations', next: 'executive-design' },
        ],
      },
      {
        id: 'international-oversight',
        text: 'Strong international oversight compensates for weak central institutions: an international High Representative with power to impose decisions if domestic institutions deadlock, an international police mission, and mandatory international arbitration for inter-entity disputes. This works in the short term but creates dependency. The question is whether domestic institutions will ever be strong enough to function without international training wheels.',
        choices: [
          { text: 'Accept the dependency trade-off and finalize the agreement', next: 'power-sharing-partial' },
        ],
      },
      {
        id: 'economic-compensation',
        text: 'You offer economic incentives to sweeten the deal for the North: the capital city stays in Northern territory, the central bank is headquartered there, and international investment is directed toward Northern infrastructure. Markovic grudgingly accepts: "We get the economics, they get the autonomy. I can sell that." The asymmetric model holds together.',
        choices: [
          { text: 'Finalize the asymmetric federation into a comprehensive agreement', next: 'final-package' },
        ],
      },
      {
        id: 'modified-asymmetry',
        text: 'You reduce the asymmetry while giving the South specific security guarantees: their police force is maintained but reports to a joint security council, their parliament has autonomy on domestic issues but foreign policy is shared, and an international force guarantees their borders for ten years. Markovic accepts. Petrovic hesitates but agrees when his military advisors confirm the security arrangements are adequate.',
        choices: [
          { text: 'Finalize the modified framework', next: 'final-package' },
        ],
      },
      {
        id: 'coin-flip',
        text: 'You suggest a coin flip for who holds the presidency first. Both delegations stare at you. Then Petrovic laughs. Markovic smiles despite himself. "A coin flip to decide the fate of a nation," Petrovic says. "Why not? We\'ve tried everything else." The coin lands on Markovic. Petrovic accepts graciously. The absurdity of the moment breaks the tension that has paralyzed the talks. Sometimes humor is the best diplomacy.',
        choices: [
          { text: 'With the sequencing resolved, finalize the rotating presidency model', next: 'final-package' },
        ],
      },
      {
        id: 'technocrat-first',
        text: 'A neutral technocrat — a respected former EU official — is proposed as the first president. Both sides agree because it postpones the painful question of who goes first. The technocrat\'s two-year term will focus on institution-building and reconstruction. After that, the rotating mechanism kicks in. It\'s a creative workaround that buys time for trust to develop.',
        choices: [
          { text: 'Finalize the technocrat-first proposal within the broader agreement', next: 'final-package' },
        ],
      },
      {
        id: 'final-package',
        text: 'After weeks of intense negotiation, a comprehensive agreement takes shape. The final all-night session begins at 8 PM. By 3 AM, most issues are resolved. At 5 AM, a dispute over a single clause about return of refugees almost derails everything. At 7 AM, Markovic and Petrovic sit alone in a room for thirty minutes — the first time they\'ve spoken without mediators. When they emerge, both nod. The agreement is done.',
        choices: [
          { text: 'Witness the signing ceremony', next: 'power-sharing-success' },
        ],
      },
      {
        id: 'power-sharing-success',
        text: 'The signing ceremony is held in the castle\'s great hall. Markovic signs first, then Petrovic, then Dr. Farkas for the Romani community. International leaders stand as witnesses. The agreement is imperfect — both sides gave up things they wanted, and implementation will be enormously difficult. But as the three leaders stand together for a photograph they would never have imagined possible a year ago, you allow yourself a moment of hope. A new country is being born from the ashes of war.',
        isEnding: true,
        outcome: 'success',
        score: 100,
        realWorldParallel: 'This mirrors the Good Friday Agreement of 1998, which ended three decades of conflict in Northern Ireland. That agreement, brokered over two years of talks at Stormont, featured power-sharing between unionists and nationalists, cross-community veto mechanisms, police reform, and international oversight. Like this scenario, it required leaders to take enormous political risks and make compromises that their bases initially rejected. Twenty-five years later, despite setbacks, the peace has held.',
      },
      {
        id: 'power-sharing-partial',
        text: 'The agreement is signed, but everyone knows it is held together by international presence rather than domestic consensus. The power-sharing institutions function as long as international officials are watching, but deadlock whenever they step back. Both communities retreat into parallel societies. The peace holds — no one returns to war — but reconciliation remains a distant dream. It is better than war, but far from the just and lasting peace the negotiators hoped for.',
        isEnding: true,
        outcome: 'partial',
        score: 55,
        realWorldParallel: 'This closely mirrors the post-Dayton situation in Bosnia and Herzegovina. The 1995 Dayton Accords ended the Bosnian War but created institutions that have struggled with dysfunction for decades. The international High Representative still holds sweeping powers nearly thirty years later. Ethnic division remains entrenched in politics. The lesson: ending a war and building a functioning shared society are two very different achievements.',
      },
      {
        id: 'power-sharing-failure',
        text: 'The talks collapse when hardliners on both sides reject the compromises their leaders were prepared to make. Markovic is challenged by a faction demanding military victory. Petrovic faces a coup attempt from commanders who see the negotiations as betrayal. Within weeks, the ceasefire collapses. The international community, exhausted by the failed process, reduces its engagement. The war resumes, worse than before, because now both sides feel betrayed by the promise of peace.',
        isEnding: true,
        outcome: 'failure',
        score: 15,
        realWorldParallel: 'This reflects the collapse of numerous peace processes where hardliners outmaneuvered moderates. The Israeli-Palestinian Oslo process deteriorated as extremists on both sides undermined leaders willing to compromise. In Sri Lanka, a promising 2002 ceasefire collapsed when hardliners on both sides rejected concessions, leading to the devastating final phase of the civil war. Peace processes can make things worse if they raise hopes and then fail.',
      },
    ],
  },
  {
    id: 'humanitarian-corridor',
    title: 'The Humanitarian Corridor',
    subtitle: 'Can you get aid to a million starving people through a war zone?',
    icon: '🚑',
    color: '#e74c3c',
    basedOn: 'Inspired by humanitarian negotiations in Syria and Yemen',
    introduction: 'You are the head of a UN humanitarian coordination office in a Middle Eastern country torn apart by a multi-sided civil war. Government forces control the major cities. Rebel factions hold the countryside. A foreign power conducts airstrikes supporting the government. In the besieged northern region, one million civilians are running out of food, medicine, and clean water. Without aid in the next three weeks, people will start dying en masse. Every road into the north passes through at least one frontline. Your job: negotiate humanitarian access before it\'s too late.',
    nodes: [
      {
        id: 'start',
        text: 'Your morning briefing paints a grim picture. Satellite imagery shows long lines at empty markets in the besieged northern city. Your medical team estimates 15,000 children are severely malnourished. The government claims they are fighting terrorists and any aid will be diverted by rebels. The main rebel group says they will allow aid but only if the government stops bombing civilian areas. A smaller extremist faction controlling one checkpoint has made no statements at all. You have three possible routes into the north. Which approach do you prioritize?',
        choices: [
          { text: 'Negotiate directly with the government for access through the main highway (Route Alpha)', next: 'government-route' },
          { text: 'Approach the main rebel group about access through countryside roads (Route Beta)', next: 'rebel-route' },
          { text: 'Explore a cross-border route from a neighboring country that avoids both parties (Route Gamma)', next: 'cross-border' },
          { text: 'Pursue all three routes simultaneously to maximize chances', next: 'all-routes' },
        ],
      },
      {
        id: 'government-route',
        text: 'You meet with the Deputy Minister of Defense, a polished diplomat who speaks perfect English. He is sympathetic but firm: "We have no objection to humanitarian aid. But we must inspect every truck. We cannot allow weapons to reach the terrorists under cover of aid. And we require a list of every recipient — we need to know who is receiving food." He hands you a 47-page inspection protocol. Your logistics team estimates it would take 6 weeks to process the first convoy under these rules. You don\'t have 6 weeks.',
        choices: [
          { text: 'Negotiate a streamlined inspection process: random spot checks instead of full inspections', next: 'streamlined-inspection' },
          { text: 'Accept the inspection protocol but propose a parallel emergency airlift for critical medical supplies', next: 'airlift-proposal' },
          { text: 'Reject the protocol and threaten to publicize that the government is blocking aid', next: 'public-pressure-gov' },
        ],
      },
      {
        id: 'rebel-route',
        text: 'Your team makes contact with the main rebel coalition\'s humanitarian liaison. He meets you at a safe house near the front line. "We welcome humanitarian aid for our people," he says. "But every convoy that enters through government territory arrives half-empty — they steal the supplies. Come through our territory. We guarantee security." He offers Route Beta, but it passes through territory controlled by three different armed groups, requiring three separate agreements. And the last 20 kilometers runs through the extremist faction\'s zone.',
        choices: [
          { text: 'Accept the rebel route and begin negotiating with each armed group along the way', next: 'multi-group-negotiation' },
          { text: 'Ask the rebel liaison to negotiate access from the other groups on your behalf', next: 'rebel-intermediary' },
          { text: 'Propose a compromise: use the rebel route but with international monitors the government can accept', next: 'monitored-rebel-route' },
        ],
      },
      {
        id: 'cross-border',
        text: 'The cross-border route from the neighboring country is technically the safest, but it is politically explosive. The government considers cross-border aid a violation of sovereignty. The UN Security Council authorized cross-border operations in the past, but the authorization expired and Russia and China have vetoed renewal. Using this route without authorization could jeopardize your entire operation — or save a million lives.',
        choices: [
          { text: 'Push for an emergency Security Council session to re-authorize cross-border operations', next: 'security-council' },
          { text: 'Use the cross-border route quietly, framing it as a "pilot program" without seeking formal authorization', next: 'quiet-cross-border' },
          { text: 'Negotiate directly with the neighboring country to allow aid transit regardless of UN politics', next: 'bilateral-neighbor' },
        ],
      },
      {
        id: 'all-routes',
        text: 'You assign teams to negotiate all three routes simultaneously. This is resource-intensive — your staff is already exhausted — but it maximizes your chances. Within 48 hours, you have preliminary responses: the government will allow access on the main highway with inspections, the rebels offer a countryside route through multiple armed group zones, and the neighboring country is willing to discuss cross-border access. None are ready, but all are possibilities.',
        choices: [
          { text: 'Focus on the government route as the most politically sustainable option', next: 'government-route' },
          { text: 'Focus on the cross-border route as the fastest to operationalize', next: 'cross-border' },
          { text: 'Pursue a hybrid: government route for food, cross-border for medicine, rebel route for water equipment', next: 'hybrid-approach' },
        ],
      },
      {
        id: 'streamlined-inspection',
        text: 'You counter-propose: UN monitors seal the trucks at origin, GPS tracking shows the route in real-time, and the government can conduct random spot checks at two designated points. It\'s faster and maintains their oversight without the full 47-page protocol. The Deputy Minister considers. "Random checks... My generals won\'t like that. But if the UN monitors are credible and we get the GPS data..." He asks for 24 hours to consult.',
        choices: [
          { text: 'Give him 24 hours and use the time to prepare trucks and supplies', next: 'prepare-convoy' },
          { text: 'Sweeten the deal: offer the government positive media coverage for facilitating humanitarian aid', next: 'media-coverage' },
        ],
      },
      {
        id: 'airlift-proposal',
        text: 'The government agrees to allow a medical airlift — planes are easier to inspect than truck convoys. But airspace is complicated: the foreign power conducts daily bombing runs, and deconfliction is critical. You contact the foreign power\'s military liaison. They agree to provide a 4-hour daily window for humanitarian flights, but you must share exact flight plans 48 hours in advance. It\'s bureaucratic, but the first medical supplies could arrive within a week.',
        choices: [
          { text: 'Accept the airlift arrangement for medical supplies while continuing to negotiate the road route for food', next: 'parallel-tracks' },
          { text: 'Push for expanding the airlift to include food as well', next: 'expanded-airlift' },
        ],
      },
      {
        id: 'public-pressure-gov',
        text: 'You hold a press conference detailing the humanitarian crisis and the government\'s inspection protocol. International media runs the story. The government is furious. The Deputy Minister calls you: "You have burned this bridge. We offered cooperation and you chose propaganda." The government suspends all humanitarian negotiations. Your team in the capital is harassed at checkpoints. It will take weeks to repair the relationship — time the besieged population does not have.',
        choices: [
          { text: 'Pivot entirely to the cross-border and rebel routes', next: 'pivot-alternatives' },
          { text: 'Send a senior UN official to apologize and restart government negotiations', next: 'repair-government' },
        ],
      },
      {
        id: 'multi-group-negotiation',
        text: 'Negotiating with three armed groups is exhausting. The first group, a moderate rebel faction, agrees quickly in exchange for aid to their own communities. The second, a Kurdish militia, wants political recognition as a condition. The third is the extremist faction — they demand a ransom of $2 million for "transit fees" and threaten to seize any convoy that doesn\'t pay.',
        choices: [
          { text: 'Pay the extremist faction\'s "transit fees" to save lives immediately', next: 'pay-extremists' },
          { text: 'Refuse to pay and explore alternative routes that bypass the extremist zone', next: 'bypass-extremists' },
          { text: 'Negotiate with the extremist faction, offering humanitarian services in their territory instead of cash', next: 'services-not-cash' },
        ],
      },
      {
        id: 'rebel-intermediary',
        text: 'The main rebel group negotiates with the smaller factions along Route Beta. They succeed with the moderate faction and the Kurdish militia, but the extremist group refuses: "We don\'t take orders from those apostates." The rebel liaison shrugs: "We can clear the first 80 kilometers. The last 20 is on you." You need to deal with the extremist checkpoint yourself.',
        choices: [
          { text: 'Approach the extremist faction directly through local tribal elders who have connections', next: 'tribal-approach' },
          { text: 'Try to find a route that bypasses the extremist checkpoint entirely', next: 'bypass-extremists' },
        ],
      },
      {
        id: 'monitored-rebel-route',
        text: 'The compromise proposal — rebel route with international monitors — is clever. The rebels see the monitors as witnesses to government atrocities. The government sees them as guarantees against diversion. You assemble a monitoring team from neutral countries. Both sides agree in principle. But the logistics are complex: who provides security for the monitors? What happens when they witness something illegal?',
        choices: [
          { text: 'Finalize the monitoring arrangements with clear rules of engagement', next: 'finalize-monitors' },
          { text: 'Start the convoy immediately with monitors and sort out edge cases on the ground', next: 'convoy-moves' },
        ],
      },
      {
        id: 'security-council',
        text: 'You lobby for an emergency Security Council session. The humanitarian briefing is devastating — your team presents satellite imagery and medical data. Western nations push for immediate authorization. Russia and China argue it violates sovereignty. After three days of debate, a compromise emerges: a 90-day authorization for cross-border aid with government notification (but not consent). It passes 13-0, with Russia and China abstaining rather than vetoing.',
        choices: [
          { text: 'Move immediately to operationalize the cross-border route', next: 'cross-border-operational' },
        ],
      },
      {
        id: 'quiet-cross-border',
        text: 'You begin moving small aid shipments across the border without formal authorization, describing them as "pre-positioning" supplies. For two weeks, it works. Then a government drone photographs your trucks crossing the border. The footage is broadcast on state television as evidence of "foreign conspiracy." The government demands your expulsion. Your entire in-country operation — not just the northern corridor, but programs across the country serving 4 million people — is at risk.',
        choices: [
          { text: 'Retreat from the cross-border route and focus on repairing government relations', next: 'repair-government' },
          { text: 'Double down: massively scale up the cross-border operation before the government can stop it', next: 'double-down' },
        ],
      },
      {
        id: 'bilateral-neighbor',
        text: 'The neighboring country\'s foreign minister is sympathetic: "We see the refugees. We know people are dying. We will allow transit." But she adds: "We cannot be seen to violate our neighbor\'s sovereignty. If this becomes public, we will deny everything and close the border." This gives you a fragile, deniable supply line. Supplies can cross at night in unmarked trucks. It\'s not enough for a million people, but it could save thousands while you negotiate a larger-scale solution.',
        choices: [
          { text: 'Accept the covert arrangement for critical medical supplies while pursuing formal access', next: 'covert-and-formal' },
          { text: 'Use the covert route as leverage: tell the government you have alternatives if they don\'t cooperate', next: 'leverage-play' },
        ],
      },
      {
        id: 'hybrid-approach',
        text: 'The hybrid approach is logistically complex but strategically sound. Food moves on the government route (high volume, slower due to inspections). Medicine goes cross-border (faster, smaller volume). Water purification equipment goes through the rebel route (heavy equipment, closest access). Your logistics coordinator looks at the plan: "This is insane. Three separate supply chains through three separate conflict zones." She pauses. "Let\'s do it."',
        choices: [
          { text: 'Operationalize all three routes simultaneously', next: 'triple-operation' },
          { text: 'Start with the easiest route first and add routes as capacity allows', next: 'sequential-start' },
        ],
      },
      {
        id: 'prepare-convoy',
        text: 'The 24 hours pass. The Deputy Minister calls: "Random spot checks at two points. GPS tracking. UN seals. My generals accept." Your warehouse teams have loaded 40 trucks with food and supplies during the wait. The first convoy rolls out at dawn with armed government escorts, UN monitors, and a media crew the government invited to show their cooperation. At the first checkpoint, soldiers inspect three randomly selected trucks. Everything is in order. The convoy proceeds.',
        choices: [
          { text: 'Monitor the convoy\'s progress to the besieged north', next: 'convoy-progress' },
        ],
      },
      {
        id: 'media-coverage',
        text: 'The positive media angle works. You arrange for a CNN crew to accompany the first convoy and interview the Deputy Minister. He is filmed opening a truck of medical supplies and saying: "Our government has always prioritized the welfare of all citizens." It\'s political theater, but it serves the purpose. The government approves the streamlined inspection protocol within 12 hours. Image management is a powerful diplomatic tool.',
        choices: [
          { text: 'Launch the first convoy with media coverage', next: 'convoy-progress' },
        ],
      },
      {
        id: 'parallel-tracks',
        text: 'The dual-track approach works: medical airlifts begin within a week, carrying antibiotics, surgical supplies, and infant formula. Meanwhile, your team continues grinding through negotiations for the road route. After 10 days, the first truck convoy departs alongside continued airlifts. The combination of air and road access allows you to reach 80% of the besieged population. It\'s not perfect — some areas remain inaccessible — but the worst of the crisis is averted.',
        choices: [
          { text: 'Scale up operations as access expands', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'expanded-airlift',
        text: 'Expanding the airlift to food requires much larger aircraft and more frequent flights. The foreign power is reluctant to expand the deconfliction window. You push, citing the scale of the famine. Eventually, they agree to two daily windows. But the airlift can only deliver 20% of what the population needs. You still need the road route. The airlift buys time — perhaps two more weeks — but it is not a solution on its own.',
        choices: [
          { text: 'Use the extra time the airlift provides to finalize road access negotiations', next: 'streamlined-inspection' },
        ],
      },
      {
        id: 'pivot-alternatives',
        text: 'Without the government route, you focus on the rebel and cross-border options. Both are slower to operationalize and can carry less volume. After two weeks of intense logistics, you establish a supply line that reaches about 60% of the besieged population. It\'s not enough, but it prevents the worst-case scenario. However, the government begins bombing the rebel route, hitting a convoy and killing two aid workers.',
        choices: [
          { text: 'Suspend operations and demand accountability for the attack on aid workers', next: 'humanitarian-partial-routes' },
          { text: 'Continue operations at night using unmarked vehicles', next: 'covert-operations' },
        ],
      },
      {
        id: 'repair-government',
        text: 'A senior UN official flies in to meet with the Foreign Minister. After three days of delicate diplomacy — including a private apology and assurances that future operations will be coordinated — the government agrees to resume negotiations. But their demands have hardened: full inspections, government escorts, and a requirement that all aid be branded with government logos. You\'ve lost leverage, but the door is open.',
        choices: [
          { text: 'Accept the harder terms to get aid moving before more people die', next: 'accept-hard-terms' },
          { text: 'Negotiate from the harder terms, trying to find workable compromises', next: 'streamlined-inspection' },
        ],
      },
      {
        id: 'pay-extremists',
        text: 'You authorize the $2 million payment disguised as "local procurement costs" in your budget. The extremist faction allows the convoy through. Aid reaches the besieged population. But within weeks, the extremist group uses the money to purchase weapons and expands their territory. Other armed groups demand similar payments. Your precedent has created a toll system that will fund violence for years. International media discovers the payment. Your organization faces a major scandal.',
        choices: [
          { text: 'Accept the consequences and focus on the lives saved', next: 'humanitarian-partial-compromise' },
        ],
      },
      {
        id: 'bypass-extremists',
        text: 'Your logistics team identifies a mountain pass that bypasses the extremist checkpoint. It adds 6 hours to the journey and can only accommodate small vehicles, not large trucks. You organize a relay system: large trucks drive to the edge of the extremist zone, supplies are transferred to smaller vehicles that take the mountain pass, then transferred again to trucks waiting on the other side. It\'s slow and expensive, but it works without funding extremists.',
        choices: [
          { text: 'Operationalize the bypass route', next: 'bypass-operational' },
        ],
      },
      {
        id: 'services-not-cash',
        text: 'You offer the extremist faction what they actually need more than cash: medical care for their wounded fighters, food for their families, and education for children in their territory. Your team sets up a small clinic and food distribution point near their checkpoint. The faction\'s local commander agrees to let convoys pass. Your approach avoids funding violence while meeting real needs. It is a pragmatic compromise that keeps your principles mostly intact.',
        choices: [
          { text: 'Formalize the arrangement and begin regular convoy operations', next: 'convoy-moves' },
        ],
      },
      {
        id: 'tribal-approach',
        text: 'Local tribal elders have influence even over the extremist faction. They approach the faction\'s leader and invoke traditional obligations of hospitality and protection of the weak. The faction\'s leader agrees to allow humanitarian convoys under tribal escort — but only food and medicine, no communications equipment or other items they consider dual-use. It\'s a narrow agreement, but it opens the route.',
        choices: [
          { text: 'Accept the tribal arrangement and begin moving food and medicine', next: 'convoy-moves' },
        ],
      },
      {
        id: 'finalize-monitors',
        text: 'You establish clear rules: monitors can observe and report but will not intervene in military operations. They will document any interference with humanitarian operations. Their reports go to the UN Secretary-General. Both sides accept these terms because the monitors are a shield against accusations: "We have nothing to hide." The monitoring team deploys in 72 hours.',
        choices: [
          { text: 'Launch the monitored convoy', next: 'convoy-moves' },
        ],
      },
      {
        id: 'convoy-moves',
        text: 'The first convoy — 25 trucks carrying enough food for 50,000 people for one month — begins its journey. The first checkpoint goes smoothly. At the second, armed men demand to inspect every truck. Your monitors intervene, citing the agreed protocol. Tense minutes pass. Radio calls are made. Finally, the trucks are waved through. Sixteen hours after departure, the convoy arrives in the besieged city. Crowds gather. People weep at the sight of food trucks. Children who haven\'t eaten properly in weeks line up for nutrition packs.',
        choices: [
          { text: 'Establish a regular convoy schedule to sustain the supply line', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'cross-border-operational',
        text: 'With Security Council authorization in hand, you move fast. The neighboring country opens a border crossing. Your logistics teams pre-positioned supplies during the Security Council debate. The first convoy crosses within 48 hours of the vote. It is the fastest, most direct route to the besieged population. Within a week, supplies are reaching 800,000 people. The government protests loudly but cannot block what the Security Council has authorized.',
        choices: [
          { text: 'Scale up the cross-border operation while pushing for access from government territory too', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'double-down',
        text: 'You massively scale up the cross-border operation, pushing through 100 trucks in three days. The supplies reach desperate people. But the government retaliates: they bomb a warehouse in the besieged city where aid is being distributed, killing 12 civilians and 3 aid workers. The international outcry is fierce, but so is the damage. Your operation in the rest of the country is expelled. Millions of people in government-controlled areas lose access to aid. You saved thousands in the north but endangered millions elsewhere.',
        isEnding: true,
        outcome: 'failure',
        score: 25,
        realWorldParallel: 'This dilemma mirrors the debates over cross-border aid into northwest Syria. The UN authorized cross-border operations from Turkey from 2014, but Russia repeatedly threatened to veto renewal, arguing it violated sovereignty. Aid organizations faced the agonizing choice between maintaining access in government areas and reaching besieged populations in rebel territory. The lesson: humanitarian access gained through confrontation is fragile and can trigger retaliation against the people you are trying to help.',
      },
      {
        id: 'covert-and-formal',
        text: 'The dual approach works: covert nighttime medical shipments save lives immediately, while your formal negotiations continue. After three weeks, you secure both a government-approved road route with inspections and a formal cross-border arrangement authorized by the Security Council. The covert operation was the bridge that kept people alive while diplomacy caught up. When the formal routes open, the covert shipments quietly cease.',
        choices: [
          { text: 'Transition to fully formal operations', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'leverage-play',
        text: 'You tell the Deputy Minister that you have "alternative options" for reaching the besieged population and would prefer to work with the government but will act regardless. It\'s a gamble. The Deputy Minister narrows his eyes: "Are you threatening us?" The meeting ends abruptly. Two days later, however, the government proposes a dramatically simplified inspection process. Your bluff — or was it a bluff? — has worked. But the government will remember this.',
        choices: [
          { text: 'Accept the simplified process and launch the convoy', next: 'convoy-progress' },
        ],
      },
      {
        id: 'triple-operation',
        text: 'Managing three simultaneous supply chains through three conflict zones is the most complex humanitarian operation your office has ever attempted. There are daily crises: a government checkpoint demands bribes, a rebel faction diverts a water truck, the cross-border route is delayed by a sandstorm. But the diversity of routes means that when one is blocked, the others continue. After one month, 85% of the besieged population is receiving some form of assistance. It\'s not enough, but no one is starving.',
        choices: [
          { text: 'Sustain and optimize the triple operation', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'sequential-start',
        text: 'You start with the cross-border route — it\'s fastest. Medical supplies begin flowing within days. The airlift adds food. Then the government route opens for bulk supplies. Finally, the rebel route brings water equipment. Each route took time to establish, but the sequential approach meant your team wasn\'t overwhelmed. By the end of week three, all three routes are operational. The besieged population begins recovering.',
        choices: [
          { text: 'All routes are now functioning', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'convoy-progress',
        text: 'The first government-route convoy reaches the besieged north after a tense 14-hour journey. At each checkpoint, inspections are conducted — sometimes quickly, sometimes with deliberate slowness designed to make a political point. One truck is held for "further examination" and its contents are confiscated. But 39 of 40 trucks arrive. Inside the city, aid workers distribute food to crowds that have been waiting since dawn. A mother tells your staff: "I told my children help was coming. For the first time in months, I wasn\'t lying."',
        choices: [
          { text: 'Establish regular convoys and fight for the confiscated supplies', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'bypass-operational',
        text: 'The mountain bypass works. It\'s slow — each relay takes 16 hours instead of the normal 6-hour drive — and expensive. But it works. Supplies flow to the besieged population without funding extremists or compromising your principles. After a month, the extremist faction sees the bypassed revenue and offers to reopen the main road for a much lower fee — which you decline. Eventually, the faction splinters, and a more moderate leader allows free passage in exchange for healthcare services.',
        choices: [
          { text: 'Transition to the direct route when the extremist faction allows it', next: 'humanitarian-success' },
        ],
      },
      {
        id: 'accept-hard-terms',
        text: 'You accept the government\'s harder terms. Trucks are fully inspected, government soldiers ride in the convoys, and all food bags are stamped with government logos. It is humiliating and slow. But aid reaches people who are dying. Your field staff are frustrated: "We\'re legitimizing a government that created this crisis." You respond: "We are feeding people who will die without us. That is our mandate." It is the hardest kind of humanitarian work — cooperating with those who caused the suffering in order to reduce it.',
        choices: [
          { text: 'Maintain the operation under difficult conditions', next: 'humanitarian-partial-compromise' },
        ],
      },
      {
        id: 'covert-operations',
        text: 'Nighttime operations using unmarked vehicles are dangerous. Your drivers navigate without headlights through war zones. Two convoys make it through. The third is ambushed — not by the government, but by bandits who have noticed the pattern. A driver is killed. You suspend the covert operations. The loss forces a reckoning: you cannot sustain this approach without putting staff at unacceptable risk.',
        choices: [
          { text: 'Return to formal negotiations with the government despite the damaged relationship', next: 'repair-government' },
        ],
      },
      {
        id: 'humanitarian-success',
        text: 'The supply lines hold. Over the next three months, your operation delivers 45,000 metric tons of food, 2 million liters of clean water, and medical supplies serving 400,000 patients. Child malnutrition rates drop by 60%. No one starves. It was not clean or easy — every day brought new challenges, new checkpoint confrontations, new bureaucratic obstacles. But the fundamental humanitarian objective was achieved: people who would have died are alive. At the three-month review, a colleague asks you: "Was it worth the compromises?" You think of the children in the nutrition centers, finally gaining weight. "Yes."',
        isEnding: true,
        outcome: 'success',
        score: 100,
        realWorldParallel: 'This reflects the best outcomes of humanitarian negotiation in Syria and Yemen. In Syria, the cross-border mechanism from Turkey at its peak delivered 800 truckloads of aid per month to millions of people. In Yemen, patient negotiation by the World Food Programme maintained access to feed 13 million people even as fighting continued. These operations required constant negotiation, creative problem-solving, and difficult compromises — but they kept people alive.',
      },
      {
        id: 'humanitarian-partial-routes',
        text: 'After the convoy attack, you suspend operations for 72 hours while demanding accountability. No one is held accountable — no one ever is in these situations. But the international outcry creates enough pressure for a renewed ceasefire along the humanitarian corridors. Operations resume, but at reduced scale. You reach about 65% of the besieged population. The rest rely on local markets and smuggler networks. It is not enough, but it is better than nothing.',
        isEnding: true,
        outcome: 'partial',
        score: 55,
        realWorldParallel: 'Attacks on humanitarian convoys are tragically common in modern conflicts. In Syria, the September 2016 attack on a UN convoy near Aleppo killed 20 aid workers and destroyed 18 trucks. In Yemen, Saudi-led coalition strikes have hit hospitals, schools, and aid distribution points. The challenge for humanitarians is whether to continue operating under such conditions. Most do, because the alternative — leaving — condemns civilians to worse suffering.',
      },
      {
        id: 'humanitarian-partial-compromise',
        text: 'The operation functions, but under severe constraints. Government inspections slow deliveries. Confiscated supplies never reach their intended recipients. The government stamps its logo on aid paid for by international donors. It is politically and morally unsatisfying. But people are fed. Children receive medicine. The worst humanitarian predictions do not come to pass. Your staff are exhausted and demoralized. But they know, and you know, that lives were saved — imperfectly, insufficiently, but saved.',
        isEnding: true,
        outcome: 'partial',
        score: 60,
        realWorldParallel: 'This mirrors the reality of humanitarian operations in many conflict zones where aid agencies must work with — and sometimes through — the very governments responsible for creating the crisis. In Syria, the government insisted that all humanitarian aid in its territory be coordinated through the Syrian Arab Red Crescent and government ministries. This created diversion and politicization of aid, but also meant some assistance reached people in need. The moral complexity of "complicit humanitarianism" is one of the defining challenges of modern aid work.',
      },
      {
        id: 'humanitarian-failure',
        text: 'Despite weeks of negotiations, no route opens in time. Government obstruction, rebel infighting, and international paralysis combine to create a perfect storm of failure. The first deaths from starvation are reported. Then dozens. Then hundreds. Images of emaciated children circulate on social media. The world expresses outrage but does nothing effective. By the time a route finally opens — two months too late — thousands have died. At a memorial service, you struggle with the question every humanitarian asks: could I have done something differently?',
        isEnding: true,
        outcome: 'failure',
        score: 15,
        realWorldParallel: 'This outcome reflects the worst humanitarian failures of recent decades. In the 2011 Somalia famine, delayed response contributed to 260,000 deaths, half of them children under five. In besieged areas of Syria, particularly Eastern Ghouta and Madaya, government siege tactics deliberately starved civilian populations while the international community failed to secure access. These failures underscore that humanitarian access is ultimately a political decision — and when politics fails, people die.',
      },
    ],
  },
];
