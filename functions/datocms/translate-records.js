import { buildBlockRecord } from '@datocms/cma-client-node';
import { publishRecord, retrieveRecord, updateRecord } from './functions/datocms.js';

import translate from './functions/google-translate.js';

import records from './new-records-reversed.js';

const translateRecords = async ({ record, targetLanguage }) => {
  const { id, internal_name, meta_tags, content, recommend_posts_bottom } = record;

  const translatedInternalName = await translate(internal_name.en, targetLanguage);
  const translatedMetaTitle = await translate(meta_tags?.en?.title, targetLanguage);
  const translatedMetaDescription = await translate(meta_tags?.en?.description, targetLanguage);

  const richText = await retrieveRecord(content.en[0]);
  const translatedContent = await translate(richText?.content, targetLanguage);

  // Specific to DatoCMS - you may need to adjust this for your own CMS
  const translatedRecord = {
    id,
    internal_name: {
      en: internal_name.en || '',
      es: translatedInternalName,
    },
    meta_tags: {
      en: {
        image: meta_tags?.en?.image || null,
        title: meta_tags?.en?.title || '',
        description: meta_tags?.en?.description || '',
        twitter_card: null,
      },
      es: {
        image: meta_tags?.en?.image || null,
        title: translatedMetaTitle,
        description: translatedMetaDescription,
        twitter_card: null,
      },
    },
    content: {
      en: [content?.en?.[0]],
      es: [
        buildBlockRecord({
          item_type: { type: 'item_type', id: '420496' },
          content: translatedContent,
        }),
      ],
    },
    recommend_posts_bottom: {
      en: recommend_posts_bottom?.en || [],
      es: recommend_posts_bottom?.en || [],
    },
  };

  const updatedRecord = await updateRecord({
    translatedRecord,
  });

  if (!updatedRecord || !updatedRecord.id) {
    console.log('Error: No `updatedRecord` record found.');
    return;
  }

  const publishedRecord = await publishRecord(updatedRecord.id);

  console.log(`Record: ${publishedRecord.id} published!`);
};

let currentIndex = 0;

const translateNextRecord = async () => {
  // Compare against the total records
  if (currentIndex < records.length) {
    const targetRecord = records[currentIndex];

    // Create the Dato Record - the below is an example from something else
    await translateRecords({ record: targetRecord, targetLanguage: "es" });

    currentIndex++;
  } else {
    clearInterval(updateInterval);
  }
};

// Run the updateNextRecord function once every 1.5 seconds (1500 milliseconds)
const updateInterval = setInterval(translateNextRecord, 1500);
