import db from '@lighthouse/db';

export interface VendorUpsertMessage {
  job_id: number;
}

export const handleVendorUpsert = async (
  message: VendorUpsertMessage
): Promise<void> => {
  const jobId = message.job_id;

  try {
    const job = await db('outbox_job').where({ job_id: jobId }).first();
    if (!job) {
      throw new Error('job not found');
    }

    const payload = JSON.parse(job.payload_json ?? '{}');
    const vendorId: number = payload.vendor_id;

    await db('dim_vendor')
      .where({ vendor_id: vendorId })
      .update({
        qbo_vendor_id: db.raw(
          "coalesce(qbo_vendor_id, 'QBO-' || cast(vendor_id as varchar(20)))"
        ),
        updated_at: db.fn.now(),
      });

    await db('outbox_job')
      .where({ job_id: jobId })
      .update({ status: 'done', updated_at: db.fn.now() });
  } catch (err) {
    await db('outbox_job')
      .where({ job_id: jobId })
      .update({ status: 'failed', updated_at: db.fn.now() });
    throw err;
  }
};

export default handleVendorUpsert;
