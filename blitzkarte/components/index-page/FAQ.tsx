import { FC, Fragment } from "react"

interface QuestionAnswerPair {
  question: string;
  answer: string;
}

const FAQ: FC = () => {
  const qas: QuestionAnswerPair[] = [
    {
      question: `What do you mean users can make their own maps?`,
      answer: 'Users who have Illustrator can edit the properties of a map drawn in Illustrator.'
        + ' Blitzkarte will parse those settings and immediately process the initial state of the game.'
        + ' Countries, starting units, provinces, movement options. Turn schedules and game settings are adjusted to the heart\'s content'
    },
    {
      question: `That sounds like a lot of work. Is that a lot of work?`,
      answer: `It is certainly a lot of work. However, the initial map used, based on many iterations of the game, is available for editing.`
        + ` Users would be able to edit that map as little or as lot as they like, rather than starting the globe from scratch.`
    },
    {
      question: `How am I supposed to know what to do?`,
      answer: `The shared file will have many examples of properly formatted data.`
        + ` There is also a thorough in-app validation system giving clear feedback on anything that causes an invalid map.`
        + ` I am also available for consult.`
    },
    {
      question: `Do I need Adobe Illustrator? That isn't free.`,
      answer: `Currently, yes. I believe the free SVG generator Inkscape can manipulate layer data, but it hasn't been tested.`
        + ` Therefore, it is not currently supported. It is on the roadmap to accommodate Inkscape.`
    },
    {
      question: `Is there a roadmap for the development process?`,
      answer: `There certainly is! Having used or tested various software that gets periodically updated,`
        + `I've always loved patch notes, known issues and upcoming features. It's exciting for to be the one behind the scenes.`
    },
    {
      question: `Is this mobile friendly?`,
      answer: `I don't believe the current system will lend itself well to the mobile environment, but that wouldn't prevent access.`
        + ` An intended feature is in-map clicking to order units. When this is implemented, accommodating mobile play will be more streamlined.`
    },
    {
      question: `Are you planning on adapting Blitzkarte to other Diplomacy variants?`,
      answer: `Blitzkarte was designed to be as flexible as possible for the ease of future development.`
        + `However, New World Order is by far my favorite variant, and other variants with any traction are likely side projects of other developers.`
        + `Therefore, Blitzkarte will have to be quite polished first.`
    },
    {
      question: `It looks like my vision involves a country you don't have a flag for. Can I add one?`,
      answer: `Adding flags to associate with a country is currently not possible. However, importing official flags or your own custom flag should be painless.`
        + ` Email zeldark@gmail.com to coordinate`
    }
  ]
  return (
    <div>
      <h2 className="section-header">Frequently Asked Questions</h2>
      <table className="about-section">
        <tbody>
        {
          qas.map((qaPair: QuestionAnswerPair) =>
            <Fragment>
              <tr><b>{qaPair.question}</b></tr>
              <tr>{qaPair.answer}</tr>
            </Fragment>
          )
        }
        </tbody>
      </table>
    </div>
  )
}

export default FAQ;