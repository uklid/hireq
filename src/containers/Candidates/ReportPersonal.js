import React from 'react'
import Grid from 'material-ui/Grid'
import styled from 'styled-components'
import IsoWidgetsWrapper from '../../containers/Widgets/widgets-wrapper'
import StickerWidget from '../../containers/Widgets/sticker/sticker-widget'
import CardWithStatus from './components/CardWithStatus'
import { Radar } from 'react-chartjs-2'
import { data } from './data'
import CardWithPowerBar from './components/CardWithPowerBar'
import { connect } from 'react-redux'

const GreyWrapper = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.1);
`

const H4 = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: lightblue;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

class ReportPersonal extends React.Component {

  render() {
    const { allCandidatesData } = this.props
    const { name } = this.props.allCandidatesData
    return (
      <React.Fragment>
        <Grid id="reportBody1" style={{ backgroundColor: '#eee', margin: 0, borderRadius: 5 }} container spacing={8}>
          <Grid item xs={12}>
            <H4>Sumary of Q-Score Result</H4>
          </Grid>

          <Grid item xs={12} style={{ padding: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Candidate Name: <span style={{ fontSize: 14, fontWeight: 500 }}>{name}</span></div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Position Name: <span style={{ fontSize: 14, fontWeight: 500 }}>{allCandidatesData.position}</span></div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Email: <span style={{ fontSize: 14, fontWeight: 500 }}>{allCandidatesData.email}</span></div>
          </Grid>
          <Grid item xs={12} style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <IsoWidgetsWrapper
              width='21%'
            >
              <StickerWidget
                number="90%"
                text="Cognative Ability"
                icon="ion-ios-infinite"
                fontColor="#ffffff"
                bgColor="#055a31"
                iconSize={28}
              />
            </IsoWidgetsWrapper>
            <IsoWidgetsWrapper
              width='21%'
            >
              <StickerWidget
                number="70%"
                text="Critical SoftSkills"
                icon="ion-ios-list-outline"
                fontColor="#ffffff"
                bgColor="#18713d"
                iconSize={28}
              />
            </IsoWidgetsWrapper>
            <IsoWidgetsWrapper
              width='21%'
            >
              <StickerWidget
                number="60%"
                text="Work Preference"
                icon="ion-ios-heart-outline"
                fontColor="#ffffff"
                bgColor="#8fb209"
                iconSize={28}
              />
            </IsoWidgetsWrapper>
            <IsoWidgetsWrapper
              width='34%'
            >
              <StickerWidget
                number="40%"
                text="Total Q-Score"
                icon="ion-trophy"
                fontColor="#ffffff"
                // ถ้าต่ำกว่านี้จะเป็น สี #dfd89b
                bgColor="#d4d159"
                iconSize={28}
              />
            </IsoWidgetsWrapper>
          </Grid>
          <Grid item xs={12}>
            <H4>Pitchaya Sumary Q-score overview</H4>
          </Grid>
          <Grid item xs={6}>
            <GreyWrapper>
              <h4>Cognitive Ability</h4>
              <p style={{ fontSize: 12 }}>
                Cognitive ability is brain-base skills that candidate need to carry out work task.
                  It difines the mechanism of how people learn solve problems, and make dicisions.
                  It relates to many essential functions of the brain such as memory, perception, attension
                  , and visual and spatial processing.
              </p>
            </GreyWrapper>
          </Grid>
          <Grid item xs={3}>
            <IsoWidgetsWrapper>
              <StickerWidget
                number="80"
                text="PERFECT"
                oneSideColor
                fontColor="#ABB1BE"
                bgColor="#41772D"
              />
            </IsoWidgetsWrapper>
          </Grid>
          <Grid item xs={3}>
            <IsoWidgetsWrapper>
              <StickerWidget
                number="80"
                text="HIGHT"
                oneSideColor
                fontColor="#ABB1BE"
                bgColor="#41772D"
              />
            </IsoWidgetsWrapper>
          </Grid>
          <Grid item xs={4}>
            <CardWithStatus
              title="GENERAL INTELLIGENCE AND LEARNING ABILITY "
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description={`The General Intelligence and Learning Ability (GIL) 
              scale score reflects ${allCandidatesData.name} global intelligence 
              and capacity to reason, solve problems, and learn new
            skills and abilities in new situations.`}
            />
          </Grid>
          <Grid container spacing={8} style={{ margin: 0 }}>
            <Grid item xs={6}>
              <GreyWrapper>
                <h4>Critical Softskills</h4>
                <p style={{ fontSize: 12 }}>
                  Critical soft skills are general skills that complement
                  other pasition-speciic hard skills, providing a solid ground
                   for success. We measure seven fundamental skills that are
                   broadly applicable to and are essertial in determining
                   professional success in a wide variety of jobs.

                </p>
              </GreyWrapper>
            </Grid>
            <Grid item xs={3}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number="80"
                  text="PERFECT"
                  oneSideColor
                  fontColor="#ABB1BE"
                  bgColor="#41772D"
                />
              </IsoWidgetsWrapper>
            </Grid>
            <Grid item xs={3}>
              <IsoWidgetsWrapper>
                <StickerWidget
                  number="80"
                  text="HIGHT"
                  oneSideColor
                  fontColor="#ABB1BE"
                  bgColor="#41772D"
                />
              </IsoWidgetsWrapper>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="PERFORMANCE AND PROJECT MANAGEMENT"
              score="70"
              firstColor="#055a31"
              secondColor="#3a9f56"
              firstTitle="MATCH"
              secondTitle="HIGH"
              description={`The Performance and Project Management (PPM) scale score reflects ${allCandidatesData.name} 
              ability  to handle work, lead projects, and manage the performance of others and he.`}
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="LEADERSHIP AND ORGANIZATIONAL MANAGEMEN"
              score="70"
              firstColor="#c0c0c0"
              secondColor="#d3d3d3"
              firstTitle="BELOW"
              secondTitle="LOW"
              description={`The Leadership and Organizational Management (LOM) scale score measures how
              good ${allCandidatesData.name} is at developing goals and strategies, delegating tasks, and
              motivating others to achieve them.`}
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="COMMUNICATION, PERSUASION AND NEGOTIATION"
              score="40"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description={`The Communication. Persuasion and Negotiation (CPN) scale score provides a gauge
              of ${allCandidatesData.name} ability to communicate, convince and deal effectively with
            supervisors co-workers, and subordlinates, as well as people outside the company`}
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="PEOPLE AND INTERPERSONAL SKILLS"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="The people and interpersonal skills (PIS) scale score indicates one's ability to interact
              and coperate with other, both individualy in group, in professional situaltions"
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="POLITICAL AND CULTURAL SKILLS"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description={`The Political and Cultural Skills (PCS) scale score measures 
              ${allCandidatesData.name} ability
              to adjust to different people and situations, as well as #posPronoun openness to
              change and to considerable variety in the workplace.`}
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="PRODUCTIVITY AND EFFECTIVENESS AT WORK"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description={`The Productivity and Effectiveness at Work (PEW) scale score measures 
              ${allCandidatesData.name} positive and productive behavors, as well as how one avoids behaviors
            and attitudes that negatively impact job performance.`}
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="SELF-MANAGEMENT MOTIVATION AND CONTROL"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="TThe Self-management, Motivation and Control (SMC) scale score is an indicator of a person's emotional intelligence (EQ) and related qualities, such as self-control,
              persistence, initiative, and stress tolerance."
            />
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={9}>
            <GreyWrapper>
              <h4>Work Preferences</h4>
              <p style={{ fontSize: 12 }}>
                Work preferences measure the candidate 's interest profile.
                 Our wark preferences profiler masures the candidate's job interest in six
                 dimensions and determines whetner it matches the interest proflie required
                 to enjoy and succeed in the job
              </p>
            </GreyWrapper>
          </Grid>
          <Grid item xs={3}>
            <IsoWidgetsWrapper>
              <StickerWidget
                number="80"
                text="PERFECT"
                oneSideColor
                fontColor="#ABB1BE"
                bgColor="#41772D"
              />
            </IsoWidgetsWrapper>
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="PHYSICAL, PRACTICAL AND MECHANICAL"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who prefer Physical, Practical and Mechanica typically like work activities that
              include practical, hands-on problems and solutions. They will enioy working outside, in jobs that do not involve a lot of paperwork or much interaction with others."
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="INTELLECTUAL, ANALYTICAL AND METHODOLOGICAL"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who are Intellectual. Analytical and Methodological prefer occupations that
              frequently involve working with ideas and require an extensive amount of thinking.They will enjoy processing information, facts and figuring out problems mentally."
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="CREATIVE, INNOVATIVE AND IMAGINATIVE"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who are Creative. Innovative and lmaginative prefer 
              jobs that give them room to let fly of their original self, and avoid orderad or
              repetitive acdles at all cost. They will enjoy work that can be done without lo
              following a set a clear set of rules."
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="INTERPERSONAL, COOPERATIVE AND HUMANISTIC"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who are Interpersonal, Cooperative and Humanistic typically like to interact,
              educate and do things that help people, like teaching, nursing, or protecting. They will
              enjoy jobs that involve helping or providing seivice to others."
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="PERSUASIVE, ADVENTUROUS AND MOTIVATIONAL"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who are Persuasive. Adventurous and Motivational like to lead and persuade
              people and to sell things or ideas.They will enjoy positions that frequently involve starting up
              and carrying out projects, making important decisions, and leading others."
            />
          </Grid>
          <Grid item xs={3}>
            <CardWithStatus
              title="CONSCIENTIOUS, EFFICIENT AND ORDERLY"
              score="70"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="WATCH"
              description="People who are Conscientious, Efficient and Orderly like to wok with numbers,
              records, or machines in a set, orderly, and clearly laid out way, following strict
              procedures and routines. They wil enioy working with data and details more than with ideas."
            />
          </Grid>
        </Grid>
        {/* แบ่ง Container 2 ตรงนี้ไป */}
        <Grid container spacing={8} id="reportBody2" style={{ margin: 0, backgroundColor: '#eee', borderRadius: 5 }} >
          <Grid container spacing={8} style={{ margin: 0 }}>
            <Grid item xs={12}>
              <H4>Itemized Score Report</H4>
            </Grid>
            <Grid item xs={6}>
              <Radar
                data={data}
                height={170}
                options={
                  {
                    scale: {
                      ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 20,
                      },
                      pointLabels: {
                        fontSize: 14
                      },
                    },
                    legend: {
                      display: false
                    },
                  }
                }
              />
            </Grid>
            <Grid item xs={6}>
              <GreyWrapper>
                <h4>ltemized Q-score Skills Breakdown</h4>
                <p style={{ fontSize: 12 }}>
                  The Q-test pre-qualifies {allCandidatesData.name} undefined in areas which are essential inthe job Chief Executive Officer.
                Cognitive ability and critial soft scores are reported together below as sun up {allCandidatesData.name} undefined personal
                and social intellgence.

                The radar chart on the left provides a snapshot of the eight skills scales that have resulted from {allCandidatesData.name} undefined
                reaponses tothe Q-test, compared to the metrics of an ideal candidate for the job Chief Executive Officer

                The following eight intelligence and soft skills scales are each independent fators that have resultse from {allCandidatesData.name}
                  responses otthe Q-test, To succeed in the job Chief Executive Officer, it is recommended that {allCandidatesData.name} scpre in each
                scale fails within the ideal range shown in GREEN. Scores what are either TOO LOW or TOO HIGH suggest candidte's
                incompatibility with the job description in that dimension.
                </p>
              </GreyWrapper>
            </Grid>
          </Grid>
          {/* Card with power */}
          <Grid item xs={6}>
            <CardWithPowerBar
              title="GENERAL INTELLIGENGE AND LEARNING ABILITY"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={90}
              min={60}
              score={75}
              description={`${name} receives the GIL soore of 76 points 
              (80 percentile), which is considerad moderately high, Gl score at this
              level indicates that he will be able to process meanlingful information,
              think critically, and solve work problems quite effectively, It Would not
              take long for ${name} to leam new job skills and put them to use.
              The GIL score that ${name} receives is within the ideal range for 
              the job Chief Executive Officer, which means he would have no trouble dealing
               with cognitive demands of the job (99% match).`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="PERFOERMANCE AND PROJECT MANAGEMENT"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={78}
              min={46}
              score={90}
              description={`${name} receives the PPM score of 70 points (74 percentile). This PPM score is considered moderately high. It suggests that ${name} will be able to
              handle work tasks and projects quite efficiently.His ability to anaiyze needs, articulate expectabions, and manage performance is strong, which is likely to make him a good supervisor and manager of the job. Ukid Yeesarapat will likely be a capable mentor and trainer, too.

              The PPM score that ${name} gets is within the ideal range for the job Chief Executive Officer (97% match). This suggests that Ukid Yeesarapat will be able to manage the work, responsibility, and performance required by the job successtuly.`}
            />
          </Grid>
          <Grid item xs={6}>
            {/* รอนัท */}
            <CardWithPowerBar
              title="LEADERSHIP AND ORGANIZATIONAL MANAGEMENT"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={78}
              min={46}
              score={90}
              description={`${allCandidatesData.name} receives the LOM score of 70 point (74 percentile) , which is considered moderately high.
              This level of LOM score indicates good leader potential. ${allCandidatesData.name} will be able to develop clear objectives and strategies, as wel as organize,
              prioritize, and delegate tasks well. He is good at building teams and possesses good decision-making
              skills required to lead them. ${allCandidatesData.name} has good overall management potential
              and is likely to develop into a good leader in the future.
              
              ${allCandidatesData.name} LOM score is within the ideal range for the job Cheif Excecutive Officer (91% match). ${allCandidatesData.name}
              is likely able to handle the leadership and managerial responsibilities that the job requires very effectively.`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="COMMUNICATION, PERSUASION AND NEGOTIATION"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={80}
              min={20}
              score={40}
              description={`${name} receives the CPN score of 63 points (#cpnperc# percentile). This is a moderately high CPN score. It predicts that ${name} will quite frequently
              ask relevant questions. and is effective at influencing coworkers and customers. He also delivers good persentaions. ${name} is also an effective persuader and
              neogotiator. He is fairly good at convincing others to change their minds or actions. He is good at selling, too, whetherit is selling products, services or ideas
               The CPN score that ${name} receives os within the ideal range for the job Chief Excutive Officer, which implies that ${name} would have no trouble
                dealing with the demands of the job in the respect (81% match).`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="PEOPLE AND INTERPERSONAL SKILLS"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={40}
              min={10}
              score={60}
              description={`${name} PIS score is 60 points (63 percenile). This is a moderately high PlS score. It predicts that ${name} will be able to establish and maintain
              interpersonal and working relatonships well.He can get people to work together to accomplish tasks. ${name} will collaborate well with colleagues, customers, and clients, making him a good team member. He can resolve work conflicts quite satisfactorily.

              The PIS score that ${name} receives is within the ideal range for the job Chiet Executive Officer (95% matcn). It indicates that ${name} will be able to deal with the interpersonal and people aspect of the job very well.`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="POLITICAL AND CULTLURAL SKILLS"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={80}
              min={20}
              score={40}
              description={`${allCandidatesData.name} PCS score is 99 points (89 percentile). This is very high PCS score, which indicates ${allCandidatesData.name}
            excellent flexibility and adaptability. He will be able to adapt to most environment and people. in communication, he will study his audiences and very effectively tailor his messages to
            appeal to them. ${allCandidatesData.name} learn cultural differences and unwritten rules in the workplace very fast. He is also likely to manage his impression and represent the organization positively at all times.
            ${allCandidatesData.name} PCS score is within the ideal range for the job Chief Executive Officer (92% match), which indicates competence concerning functioning
            in the culture and climate of the job.`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="PRODUCTIVITY AND EFFECTIVENESS AT WORK"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={40}
              min={10}
              score={60}
              description={`${name} receives the PEW score of 60 points (63 percentile). This PEW score is considered moderately high. It predicts that ${name} will be productive
              and efficient.He is careful about detail and
               thorouch in completing work tasks. He displays cooperative attiude and is pieasant with colleagues and clients. ${name}
                is honest and ethical. Ii is likely that ${name} will be honest and ethical, as well as reliable, and dependable in fulfilling obligations.`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="SELF-MANAGEMENT, MOTIVATION AND CONTROL"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={100}
              min={80}
              score={30}
              description={`${name} receives the SMC score of 88 points (89 percentile), which is considered very high. SMC score this high indicates very strong EQ. ${name} is his own boss. He takes responsibility for his performance, work, ane behaviors very seriously, His level of personal drive. commitment, and optimism is significantly above average. ${name} will Ikely be able to control and manage his emotions and stress very well in every cccasion

              The SMC score that ${name} receives is within the ideal range for the job Chief Executive Officer (98 match). This illustrates that ${name} will be able to control emotions, tolerate stress, and deal with demands aft the job in this respect. ${name} is also sutficiently motivated to succeed in the job.`}
            />
          </Grid>
        </Grid>
        {/* End card with power bar */}
        <Grid id="reportBody3" container style={{ backgroundColor: '#eee', margin: 0, borderRadius: 5 }} spacing={8}>
          <Grid item xs={12}>
            <H4>Itemized Score Report</H4>
          </Grid>
          <Grid item xs={6}>
            <Radar
              data={data}
              height={170}
              options={
                {
                  scale: {
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 100,
                      stepSize: 20,
                    },
                    pointLabels: {
                      fontSize: 14
                    },
                  },
                  legend: {
                    display: false
                  },
                }
              }
            />
          </Grid>
          <Grid item xs={6}>
            <GreyWrapper>
              <h4>Itemized Q-score Preferences Breakdown</h4>
              <p style={{ fontSize: 12 }}>
                The radar chart on the left shows {name} work preference profile containing six basic types of work environments, compared to the typical work environment and style of the job Chief Executive Officer. It is more likely that {name} will be successful and satisfied if his preference profile matches the charactoristics and nature of the job.

              The following six work preference scales are outcomes that have resulted from  {name} responses. To succeed and be
              satisfied with the job Chief Executive Officer, {name} score in each trait should be within the ideal range shown in GREEN. A score that is TOO LOW or TOO HIGhHi suggests that there is a preference mismatch in that dimension.
                </p>
            </GreyWrapper>
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="PHYSICAL, PRACTICAL AND MECHANICAL"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={40}
              min={10}
              score={60}
              description={`${name} prefers jobs that are Physical and Mechanical. He likes to work with hands, focus on things in the physical world
              , using physical skills. He likes to explore and adventure. He is prefers to solve a problems that are concrete rather than abstract, and wants practical solutions that can be acted out.
              ${name} is productive in work environments that are stable, organized, and structured.
              The job Chief Executive Officer demands tasks that are slightly less Physical, Practical and Mechanical than what ${name} 
              prefers. Therefore, his preference only moderately matchs the preference profile of the job (xx match)`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="INTELLECTUAL, ANALYTICAL AND METHODOLOGICAL"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={100}
              min={80}
              score={30}
              description={`${name} preference in ths dimension is neutral, which means that he dose not have strong preference for jobs that are Intellectual,
               Analytical and Methodological. The job Chief Executive Officer involves tasks that are a lot less Intellectual,  Analytical and Methodological than what ${name}, Thus, his preference dose not match the preference profile of the job at all (xxx match )`}
            />
          </Grid>
          {/* </Grid> */}
          <Grid item xs={6}>
            <CardWithPowerBar
              title="CREATIVE, INNOVATIVE AND IMAGINATIVE"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={40}
              min={10}
              score={60}
              description={`${name} dislikes job that Creative, Innovative and Imaginative. He dose not  particularly like to express himself in artistic forms,
              whether it is images materials, word, or programes, ${name} dose not value emotions,aestherics, or creative expression very much.
              ${name} attitude towards Creative, Innovative and Imaginative tasks matches the preference profile of the job Chief Executive Officer very well (97% match) .`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="INTERPERSONAL, COOPERATIVE AND HUMANISTIC"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={100}
              min={80}
              score={30}
              description={`${name} strongly dislikes jobs that are interpersonal, Cooperative and Humanistic, which means he dosen't particularly concern about people and their well-being
              He would rather work alone than with others. Developing relationships, understanding people, and verbal communication are not ${name} specialty at all.
               The job Chief Executive Officer requires tasks that are a lot more Interpersonal, Cooperative and Humanistic than what ${name} prefers. Therefore,
               his preference dose not match the perference profile of the job at all (70% match) `}
            />
          </Grid>
          {/* </Grid> */}
          <Grid item xs={6}>
            <CardWithPowerBar
              title="PERSUASIVE, ADVENTUROUS AND MOTIVATIONAL"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={40}
              min={10}
              score={60}
              description={`${name} preference in this dimension is meutral, which means that he dose not have strong preference for jobs that are Persuasive, Adventurous and
              Motivational. The job Chief Excenutive Offier requires tasks that are a lot more Persuasive, Adventurous and Motivational than what ${name} prefers. Hence, his preference
              dose not match the preference profile of the job at all (50% match).`}
            />
          </Grid>
          <Grid item xs={6}>
            <CardWithPowerBar
              title="CONSCIENTIOUS, EFFICIENT AND ORDERLY"
              firstColor="green"
              secondColor="green"
              firstTitle="HIGH"
              secondTitle="MATCH"
              max={100}
              min={80}
              score={30}
              description={`${name} strongly prefers jobs that are Conscientious, Efficient and Orderly. This means he greatly enjoys working with numbers , records, or machinces in a set
              ,orderly , and clearly laid out way. ${name}  especially prefers to have set goals, with detailed instructions where he can comprehensibly follow. He highly values
               order, precision, predictability. ${name} would be very productive in work environments that are structured, organized, and predictable.
              ${name} attitude towards Conscientious, Effecient and Orderly tasks matches the preference profile of the job Chief Executive Officer very well (92% match).`}
            />
          </Grid>
          {/* </Grid> */}
          <Grid item xs={12}>
            <H4>{name} Q-Score Validity</H4>
          </Grid>
          <Grid item xs={9}>
            <GreyWrapper>
              <h4>{name} Q-Score Validity</h4>
              <p style={{ fontSize: 12 }}>
                The Q-score Validity (VAL) scale represents {name} level of attention to the meaning of the statements
                ween throghout the test. It detects {name} inconsistent responses. The VAL score of 10% indicates that {name}
                paid appropriate attention when giving responses and is not likely to have responded carelessly, while the score of 0% implies that he gave answers in a completely random fashion.
              </p>
            </GreyWrapper>
          </Grid>
          <Grid item xs={3}>
            <IsoWidgetsWrapper>
              <StickerWidget
                number="80"
                text="PERFECT"
                oneSideColor
                fontColor="#ABB1BE"
                bgColor="#41772D"
              />
            </IsoWidgetsWrapper>
          </Grid>
        </Grid>
      </React.Fragment >
    )
  }
}

const mapStateToProps = state => ({
  allCandidatesData: state.Candidates.allCandidatesData,
})

export default connect(mapStateToProps, null)(ReportPersonal)

