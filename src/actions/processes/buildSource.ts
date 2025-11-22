import * as esbuild from "esbuild"
import path from "path"

const buildSource = async (
  input: string | string[],
  sourcemap: boolean = true,
) => {
  const files = Array.isArray(input) ? input : [input]
  const outDir = Array.isArray(input)
    ? "dist"
    : path.parse(input).dir.replace(/^src/, "dist")

  console.log("Transpiling...\n")

  try {
    await esbuild.build({
      entryPoints: files,
      format: "esm",
      outdir: outDir,
      platform: "node",
      target: "node16",
      sourcemap: sourcemap,
    })
  } catch (error) {
    console.error("Build failed:", error)
    process.exit(1)
  }
}

export default buildSource
