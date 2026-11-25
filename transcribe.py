#!/usr/bin/env python3
"""Genera words.json con timestamps por palabra usando faster-whisper.

Uso:
  .venv\\Scripts\\python.exe transcribe.py public/audio/mi-video.mp3 --video-id mi-video
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parent


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Transcribe audio a words.json (timestamp por palabra)"
    )
    parser.add_argument("audio", type=Path, help="Ruta al audio, ej. public/audio/mi-video.mp3")
    parser.add_argument(
        "--video-id", help="ID del video; por defecto el nombre del archivo sin extensión"
    )
    parser.add_argument("--model", default="small", help="Modelo de Whisper (default: small)")
    parser.add_argument("--language", default="es", help="Código de idioma (default: es)")
    parser.add_argument("--device", default="cpu", choices=["cpu", "cuda"])
    parser.add_argument("--compute-type", default="int8")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    audio = args.audio if args.audio.is_absolute() else ROOT / args.audio
    if not audio.exists():
        raise SystemExit(f"No existe el audio: {audio}")

    video_id = args.video_id or audio.stem
    model = WhisperModel(args.model, device=args.device, compute_type=args.compute_type)
    segments, info = model.transcribe(
        str(audio),
        language=args.language,
        word_timestamps=True,
        vad_filter=True,
    )

    words: list[dict[str, object]] = []
    for segment in segments:
        for word in segment.words or []:
            words.append(
                {
                    "word": word.word,
                    "start": round(float(word.start), 3),
                    "end": round(float(word.end), 3),
                }
            )

    output = ROOT / "data" / video_id / "words.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(words, ensure_ascii=False, indent=2), encoding="utf-8")

    print(f"Idioma detectado: {info.language} ({info.language_probability:.2f})")
    print(f"Palabras: {len(words)}")
    print(f"Escrito: {output}")


if __name__ == "__main__":
    main()
