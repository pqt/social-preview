import { Octokit } from '@octokit/rest';
import Jimp from 'jimp';
import { NextApiRequest, NextApiResponse } from 'next';
import { errorMessages } from '../../../data/errorMessages';

const cleanDescription = (text: string): string => {
  return text
    .replace(new RegExp(/:.+:/, 'gi'), '')
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ''
    )
    .trim();
};

export default async (request: NextApiRequest, response: NextApiResponse): Promise<void> => {
  try {
    /**
     * Repository owner and name
     */
    const token: string | null = (request.query.token as string) || null;
    const [owner, repo, file] = request.query.repo;
    const asImage = file === 'image';

    /**
     * Preferred colors to use
     */
    // const colors = request.query.colors as string[];

    /**
     * GitHub Repository API Response
     */
    const octokit = new Octokit({
      auth: token || process.env.GITHUB_TOKEN,
    });
    const { data } = await octokit.repos.get({
      owner,
      repo,
    });

    /**
     * Description, remove GitHub-enabled emojis and actual emojis, the follow up with removing unnecessary whitespace
     */
    const description = cleanDescription(data.description || '');

    /**
     * Image Templates
     */
    const baseImage = await Jimp.read('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209282/base.png');
    const githubLogo = await Jimp.read('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209282/github-logo.png');

    /**
     * Font family used for writing
     */
    const font = await Jimp.loadFont(
      'https://unpkg.com/@jimp/plugin-print@0.10.3/fonts/open-sans/open-sans-64-black/open-sans-64-black.fnt'
    );
    const fontSm = await Jimp.loadFont(
      'https://unpkg.com/@jimp/plugin-print@0.10.3/fonts/open-sans/open-sans-32-black/open-sans-32-black.fnt'
    );

    /**
     * Dimensions
     */
    const WIDTH = 1280;
    const HEIGHT = 640;

    /**
     * Spacing
     */
    const PADDING = 40;

    const generatedImage = baseImage
      .resize(WIDTH, HEIGHT)
      .print(
        font,
        PADDING,
        350,
        {
          text: data.name,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        WIDTH - PADDING * 2,
        HEIGHT - PADDING * 2
      )
      .print(
        fontSm,
        WIDTH * 0.175,
        450,
        {
          text: description,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        },
        WIDTH * 0.65,
        HEIGHT - PADDING * 2
      )
      .composite(githubLogo, 576, 190);

    if (asImage) {
      response.setHeader('Content-Type', 'image/png');
      response.end(await generatedImage.getBufferAsync(Jimp.MIME_PNG));
    } else {
      response.status(200).json({
        data: {
          id: data.id,
          image: await generatedImage.getBase64Async(Jimp.MIME_PNG),
        },
      });
    }
  } catch (error) {
    response.status(error.status).json({
      data: {
        error: errorMessages[error.status],
      },
    });
  }
};
