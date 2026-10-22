export type ResearchLink = {
  label: string;
  href: string;
};

export type ResearchVisual = {
  src: string;
  alt: string;
  caption: string;
};

export type PipelineStep = {
  label: string;
  detail: string;
};

export type ResearchItem = {
  slug: string;
  title: string;
  status: string;
  authors: string;
  role: string;
  dates: string;
  summary: string;
  question: string;
  approach: string[];
  findings: string[];
  limitations: string[];
  contributions: string[];
  // Only numbers that appear in a public, accepted source.
  results?: string[];
  resultsNote?: string;
  // A simplified diagram of the method, so no restricted figures are needed.
  pipeline?: PipelineStep[];
  stack: string[];
  links?: ResearchLink[];
  visuals?: ResearchVisual[];
};

export type ResearchPresentation = {
  event: string;
  year: string;
  title: string;
  presenter: string;
  myRole: string;
  researchSlug: string;
  // Add a poster only once it is cleared for public redistribution.
  poster?: ResearchVisual;
  posterPdf?: string;
};

export const publications: ResearchItem[] = [
  {
    slug: "avian-bioacoustics-transfer-learning",
    title: "Transfer Learning for Avian Bioacoustics under Sparse Positive Labels",
    status: "Accepted · IEEE MLSP 2026",
    authors: "Dhyey Patel, Yunting Yin",
    role: "First author",
    dates: "2026",
    summary:
      "Multi-source transfer learning for bird-audio classification when most species have no confirmed positive examples, treating each external dataset as a supervision source with its own reliability.",
    question:
      "When does adding external bird-audio datasets help a target task with very sparse labels, and when does it hurt?",
    approach: [
      "Target-only baselines from ecological priors (site, month, hour), lightweight acoustic features, and frozen AST, Whisper, and Wav2Vec2 embeddings.",
      "Positive-unlabeled weighting that softens the penalty on species-window pairs that are unlabeled rather than known absent.",
      "BirdCLEF 2021, iNatSounds, WABAD, and BirdSet kept as separate sources; a regularized logistic meta-classifier learns when to trust each one from out-of-fold predictions plus coverage, context, and taxonomy features.",
      "A label co-occurrence graph and 5-fold cross-validation, with macro average precision as the primary metric.",
    ],
    findings: [
      "Ecological context gave the largest single improvement among target-only components.",
      "Some sources improved the labels they covered but lowered all-label performance: negative transfer.",
      "Modeling source reliability beat pooling every source; the best configuration left one source out.",
    ],
    limitations: [
      "Public BirdCLEF+ 2026 labels are extremely sparse: only 75 of 234 species have confirmed positives.",
      "Nearby source-aware variants were not always statistically distinguishable.",
    ],
    contributions: [
      "First-authored research on transfer learning for bird-audio classification under sparse positive labels.",
      "Built and evaluated the target-only baselines.",
      "Contributed to the reliability-aware multi-source framework, including experiments measuring negative transfer across datasets.",
      "Presented the poster at the Michigan AI Symposium.",
    ],
    results: [
      "0.584 macro average precision and 0.860 macro AUC on public BirdCLEF+ 2026 validation labels.",
      "Pooling every external source reached 0.578 macro AP, below the reliability-aware configuration.",
    ],
    stack: ["Python", "PyTorch", "AST", "Whisper", "Wav2Vec2", "scikit-learn"],
    links: [
      {
        label: "arXiv:2608.03977",
        href: "https://arxiv.org/abs/2608.03977",
      },
      {
        label: "Code",
        href: "https://github.com/AcaiLab/BirdMLSP",
      },
    ],
    pipeline: [
      { label: "Target + external audio", detail: "BirdCLEF+ 2026 windows plus five external bird-audio sources" },
      { label: "Per-source models", detail: "Target-only and source-specific models produce out-of-fold scores" },
      { label: "Context features", detail: "Source coverage, site/month/hour, timing, prevalence, taxonomy" },
      { label: "Reliability meta-classifier", detail: "Regularized logistic model learns when to trust each source" },
      { label: "Species probabilities", detail: "Per-window predictions for 234 species" },
    ],
  },
  {
    slug: "email-agent-prompt-injection",
    title: "Prompt Injection Detection for Email Agents Through Attack Chain Modeling",
    status: "Accepted · IEEE ICTAI 2026",
    authors: "Ahmad Hashmi, Dhyey Patel, Yunting Yin",
    role: "Coauthor",
    dates: "2026",
    summary:
      "Detection of indirect prompt injection in LLM-powered email assistants by modeling how an attack unfolds in stages, rather than labelling each email as simply malicious or benign.",
    question:
      "Can a detector do better by modeling the attack chain: an email is retrieved, gets past defenses, triggers a tool call, and supplies the attacker's recipient and content?",
    approach: [
      "Attack-chain labels derived from LLMail-Inject's 461,640 attack attempts, plus additional benchmarks for cross-dataset evaluation.",
      "A text detector combined with stage-specific verifiers, rule-based risk signals, and checks for conflicts between the user's request and instructions in retrieved emails.",
      "A logistic decision policy, with a strict threshold calibrated on harmless emails that resemble attacks to limit false alarms.",
      "Evaluation under random splits, temporal phase transfer, stage transfer, cross-dataset transfer, and ablations.",
    ],
    findings: [
      "Random train/test splits substantially overestimate robustness under distribution shift.",
      "Later tool-argument stages are more predictable than earlier stages.",
      "Training on harmless look-alike emails reduces false alarms while preserving attack detection.",
    ],
    limitations: [
      "The strict operating policy trades away coverage: recall on some attack sets stays low.",
      "A zero-shot LLM judge generalized better on several benchmarks, though our framework runs locally without a per-message LLM call.",
    ],
    contributions: [
      "Attack-chain labeling.",
      "Experimental pipelines.",
      "Robustness evaluation.",
    ],
    results: [
      "0.406 mean F1 across five binary benchmarks under strict thresholds, compared with 0.216 for the strongest of five pretrained detectors.",
    ],
    resultsNote:
      "The pretrained detectors were evaluated without additional training, so this compares against them as released rather than retrained on the same data.",
    pipeline: [
      { label: "Retrieved email", detail: "Untrusted content an assistant reads before acting" },
      { label: "Text detector", detail: "Flags injection-like wording" },
      { label: "Stage verifiers + rules", detail: "Defense bypass, tool use, and completion signals" },
      { label: "Intent/action checks", detail: "Conflicts between the user's request and email instructions" },
      { label: "Decision policy", detail: "Logistic risk score with review and strict modes" },
    ],
    stack: ["Python", "LLMs", "AI security", "NLP"],
    links: [
      {
        label: "arXiv:2609.30657",
        href: "https://arxiv.org/abs/2609.30657",
      },
      {
        label: "Code",
        href: "https://github.com/AcaiLab/Email",
      },
    ],
  },
];

export const ongoingResearch: ResearchItem[] = [
  {
    slug: "audio-traffic-monitoring",
    title: "Temporal Multi-Task Traffic Network for Audio-Based Traffic Monitoring",
    status: "Ongoing collaborative research",
    authors: "Anantika Nair, Avantika Nair, Dhyey Patel, Yunting Yin",
    role: "Collaborator",
    dates: "2026 – present",
    summary:
      "A lightweight multi-task model for vehicle detection and vehicle-type classification from roadside audio, built on frozen audio foundation features. We are continuing the work to strengthen the experiments and results.",
    question:
      "Can one small model detect vehicles and classify their type from roadside audio, and learn when to rely on the whole recording versus short segments?",
    approach: [
      "Frozen AST and CLAP audio features, so only a small multi-task head is trained.",
      "A whole-clip branch for context and a segment branch with attention over short segments.",
      "Class-conditioned gates that learn, for each output, how much to rely on each temporal view.",
      "Partial-label supervision for clips known to contain a vehicle but without a type label, evaluated over multiple seeds on MELAUDIS, IDMT-Traffic, MVD, and MVDA, including cross-dataset transfer.",
    ],
    findings: [
      "Combining whole-clip and segment views helped compared with either view alone.",
      "A simple fixed average of the two views was a strong baseline that the learned routing did not consistently beat.",
      "Cross-dataset transfer worked best between acoustically related datasets.",
    ],
    limitations: [
      "Results are not yet peer-reviewed or published.",
      "MVDA is an augmented version of MVD, so transfer between them is not a test across independent recordings.",
    ],
    contributions: [
      "Dataset audits and cleanup, including duplicate and conflicting-audio checks.",
      "Experiments and baseline benchmarks.",
      "Pipeline documentation.",
    ],
    pipeline: [
      { label: "Roadside audio", detail: "Clips from public traffic-audio datasets" },
      { label: "Frozen AST + CLAP", detail: "Pretrained audio features; only the head is trained" },
      { label: "Clip + segment views", detail: "Whole-recording branch and attention over short segments" },
      { label: "Class-conditioned gates", detail: "Learn how much each output relies on each view" },
      { label: "Detection + vehicle type", detail: "Joint multi-task outputs" },
    ],
    stack: ["Python", "PyTorch", "AST", "CLAP", "Multi-task learning"],
  },
];

export const earlierResearch: ResearchItem[] = [
  {
    slug: "seglungai",
    title: "SegLungAI: Neonatal Lung Segmentation in Chest MRI",
    status: "Completed · Senior design, University of Cincinnati",
    authors: "Dhyey Patel, with mentors Alex Matheson, Abdullah Bdaiwi, and Jason Woods",
    role: "Student researcher; implemented the technical work",
    dates: "Aug 2024 – Apr 2025",
    summary:
      "A supervised deep-learning pipeline for segmenting lungs in neonatal chest MRI, developed with research mentors at Cincinnati Children's. The project is complete and is not ongoing clinical research.",
    question:
      "Can a model trained specifically on neonatal MRI produce accurate lung masks quickly enough to reduce slow manual segmentation?",
    approach: [
      "U-Net with an ImageNet-pretrained ResNet-50 encoder and a skip-connected decoder.",
      "Combined binary cross-entropy and Dice loss, Adam, early stopping, and learning-rate reduction.",
      "Rotation, translation, and zoom augmentation, with a 70/20/10 train/validation/test split.",
    ],
    findings: [
      "Accuracy was highest on mid-lung slices and lower near the apex and base and around motion artifacts.",
      "Some poor predictions traced back to inconsistent ground-truth annotations.",
    ],
    limitations: [
      "A small dataset from one institution; external validity was not tested.",
      "Slices are segmented independently, ignoring 3D context.",
      "A research prototype, not a clinical or deployed system. The dataset is under NDA, so no scans are shown here.",
    ],
    contributions: [
      "Built the preprocessing, training, evaluation, and inference pipeline.",
      "Packaged reproducible training scripts and evaluation outputs.",
    ],
    results: ["Mean Dice of about 0.90 and IoU of about 0.83–0.85 on validation data."],
    pipeline: [
      { label: "Neonatal chest MRI", detail: "Anonymized slices under NDA; not shown here" },
      { label: "Preprocessing", detail: "Normalization plus rotation, translation, and zoom augmentation" },
      { label: "U-Net + ResNet-50", detail: "ImageNet-pretrained encoder with a skip-connected decoder" },
      { label: "Training", detail: "BCE + Dice loss, Adam, early stopping" },
      { label: "Evaluation", detail: "Dice and IoU on validation data" },
    ],
    stack: ["Python", "TensorFlow/Keras", "U-Net", "ResNet-50", "NumPy"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Dhyey-Patel28/SegLungAI",
      },
    ],
  },
];

export const presentations: ResearchPresentation[] = [
  {
    event: "Michigan AI Symposium",
    year: "2026",
    title: "Transfer Learning for Avian Bioacoustics under Sparse Positive Labels",
    presenter: "Presented by Dhyey Patel",
    myRole: "First author; I presented this poster in person.",
    researchSlug: "avian-bioacoustics-transfer-learning",
    poster: {
      src: "/research/bird-bioacoustics-poster.jpg",
      alt: "Michigan AI Symposium poster for Transfer Learning for Avian Bioacoustics under Sparse Positive Labels, showing datasets, the multi-source reliability model, and results.",
      caption: "Datasets, target-only models, the multi-source reliability model, and results.",
    },
    posterPdf: "/research/bird-bioacoustics-poster.pdf",
  },
  {
    event: "Michigan AI Symposium",
    year: "2026",
    title: "Temporal Multi-Task Traffic Network for Audio-Based Traffic Monitoring",
    presenter: "Presented by Anantika Nair and Avantika Nair",
    myRole: "Research contributor and coauthor; I did not present this poster.",
    researchSlug: "audio-traffic-monitoring",
    poster: {
      src: "/research/traffic-audio-poster.jpg",
      alt: "Michigan AI Symposium poster for Temporal Multi-Task Traffic Network for Audio-Based Traffic Monitoring, by Anantika Nair, Avantika Nair, Dhyey Patel, and Yunting Yin, showing datasets, the T3N architecture, routing results, and cross-dataset transfer.",
      caption: "Datasets, the T3N architecture, temporal routing, and cross-dataset transfer results.",
    },
    posterPdf: "/research/traffic-audio-poster.pdf",
  },
  {
    event: "Michigan AI Symposium",
    year: "2026",
    title: "Prompt Injection Detection for Email Agents Through Attack Chain Modeling",
    presenter: "Presented by Ahmad Hashmi",
    myRole: "Coauthor; I did not present this poster.",
    researchSlug: "email-agent-prompt-injection",
    poster: {
      src: "/research/email-prompt-injection-poster.jpg",
      alt: "Michigan AI Symposium poster for Prompt Injection Detection for Email Agents Through Attack Chain Modeling, by Ahmad Hashmi, Dhyey Patel, and Yunting Yin, showing datasets, the proposed framework, and results.",
      caption: "Attack outcomes, the proposed detection framework, ablations, and comparisons.",
    },
    posterPdf: "/research/email-prompt-injection-poster.pdf",
  },
];
